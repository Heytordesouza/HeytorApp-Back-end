import { PostDatabase } from "../database/PostDatabase"
import { CommentDatabase } from "../database/CommentDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { Comment } from "../models/Comment"
import { PostDTO, GetPostInputDTO, GetPostOuputDTO, GetPostByIdInputDTO, CreatePostInputDTO, UpdatePostInputDTO, DeletePostInputDTO, LikeDislikePostInputDTO } from "../dtos/PostDTO"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { LikesDislikesPostsDB, PostWithCreatorDB, USER_ROLES } from "../types"
import { NotFoundError } from "../errors/NotFoundError"

export class PostBusiness {
    constructor(
        private postDTO: PostDTO,
        private postDatabase: PostDatabase,
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}

    public getPosts = async (input:GetPostInputDTO) => {

        const { token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' não válido!")
        }
            
        const postsDB: PostWithCreatorDB[] = await this.postDatabase.getPosts()

        const posts = postsDB.map((postDB)=>{
            const post = new Post (
                postDB.id,
                postDB.content,
                postDB.comments,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                postDB.creator_id,
                postDB.creator_name
                )
                
                return post.toBusinessModel()
        })

        const output: GetPostOuputDTO = posts

        return output
    }

    public getPostsById = async (input:GetPostByIdInputDTO)=>{
        const { id, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' não válido!")
        }

        const postDB = await this.postDatabase.getPostsWithComments(id)

        if(!postDB){
            throw new BadRequestError("'Post' não localizado")
        }
            
        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.comments,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            postDB.creator_name
        )

        const commentsPost = await this.postDatabase.findComments(id)

        if (!commentsPost) {
            throw new NotFoundError("'id' não encontrado")
        }

        const comments = new Comment(
            commentsPost.id,
            commentsPost.post_id,
            commentsPost.content,
            commentsPost.likes,
            commentsPost.dislikes,
            commentsPost.created_at,
            commentsPost.updated_at,
            commentsPost.creator_id,
            commentsPost.creator_name
        )

        const output = this.postDTO.getPostByIdOutput(post, comments)

        return output
    }



    public insertNewPost = async(input:CreatePostInputDTO)=>{

        const { token, content } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if (content.length <= 0) {
            throw new BadRequestError("'content' não pode ser nada")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' não válido!")
        }

        const id = this.idGenerator.generate()
        const creatorId = payload.id
        const creatorName = payload.name

        const newPost = new Post(
            id,
            content,
            0,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            creatorId,
            creatorName
        )

        const newPostDB = newPost.toDBModel()

        await this.postDatabase.insertPost(newPostDB)

        const output = this.postDTO.createPostOutput(newPost)

        return output
    }

    public updatePost = async (input:UpdatePostInputDTO)=>{

        const { id, token, content } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if (content.length <= 0) {
            throw new BadRequestError("'content' não pode ser nada")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' não válido!")
        }

        const filterPostToUpdate = await this.postDatabase.findPost(id)

        if(!filterPostToUpdate){
            throw new BadRequestError("'id' não encontrado")
        }

        const creatorId = payload.id

        if(payload.role !== USER_ROLES.ADMIN){

            if(filterPostToUpdate.creator_id !== creatorId){
                throw new BadRequestError("Somente ADMIN ou o criador da publicação pode editá-la")
            }
        }

        const creatorName = payload.name

        const postToEdit = new Post(
            filterPostToUpdate.id,
            filterPostToUpdate.content,
            filterPostToUpdate.likes,
            filterPostToUpdate.dislikes,
            filterPostToUpdate.comments,
            filterPostToUpdate.created_at,
            filterPostToUpdate.updated_at,
            creatorId,
            creatorName
        )

        postToEdit.setContent(content)
        postToEdit.setUpdatedAt(new Date().toISOString())

        const updatedPostDB = postToEdit.toDBModel()

        await this.postDatabase.updatePost(updatedPostDB)

        const output = this.postDTO.updatePostOutput(postToEdit)

        return output
    }

    public deletePost = async (input:DeletePostInputDTO )=>{

        const { id, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' não válido!")
        }

        const filterPostToDelete = await this.postDatabase.findPost(id)

        if(!filterPostToDelete){
            throw new BadRequestError("Publicação não encontrada")
        }

        const creatorId = payload.id

        if (
            payload.role !== USER_ROLES.ADMIN &&
            filterPostToDelete.creator_id !== creatorId
        ) {
            throw new BadRequestError("usuário não autorizado a deletar este post")
        }

        await this.postDatabase.deletePost(id)

        const output = this.postDTO.deletePostOutput()

        return output

    }

    public likeDislikePost = async (input: LikeDislikePostInputDTO)=>{

        const { id, token, like } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'Token' não válido!")
        }

        const filterPostToLike = await this.postDatabase.findPostWithCreatorId(id)
        const filterCommentToLike = await this.postDatabase.findComments(id)
        const filterIdLD = await this.postDatabase.likeDislike(payload.id, id)

        if(filterIdLD){
            throw new BadRequestError("Você já interagiu com esta publicação")
        }

        //Verifica pela Id se há uma publicação ou comentário
        if(!filterPostToLike && !filterCommentToLike){
            throw new BadRequestError("Publicação não encontrada")
        }

        //Número de likes atualizado se tiver uma publicação
        if(filterPostToLike){
            let likes = filterPostToLike.likes
            let dislikes = filterPostToLike.dislikes
    
            if(like === 0){
                dislikes++
            }else if(like === 1){
                likes++
            }else{
                throw new BadRequestError("Informe um boolean. (true) para like ou (false) para dislike")
            }
    
            const postToLike = new Post(
                id,
                filterPostToLike.content,
                filterPostToLike.comments,
                likes,
                dislikes,
                filterPostToLike.created_at,
                filterPostToLike.updated_at,
                filterPostToLike.creator_id,
                filterPostToLike.creator_name,
            )
                    
            const updateLikeDB = {
                user_id: payload.id,
                post_id: id,
                like: 1
            } 
    
            const postToLikeDB = postToLike.toDBModel()

            await this.postDatabase.updatePost(postToLikeDB)
            await this.postDatabase.updateLikeDislike(updateLikeDB)
    
            if(like === 0){
                const output = {
                    message: "'Dislike' feito com sucesso!", 
                    }
                return output
            }else if(like === 1){
                const output = {
                    message: "'Like' feito com sucesso!", 
                    }
                return output
            }
        }

        //Número de likes atualizado se tiver um comentário
        if(filterCommentToLike){

            let likes = 0
            let dislikes = 0

            if(like === 0){
                dislikes = 1          
            } else if(like === 1){
                likes = 1
            } else{
                throw new BadRequestError("Informe um boolean. (true) para like ou (false) para dislike")
            }

            const comments = 0

            const commentToLike = new Post(
                id,
                filterCommentToLike.content,
                comments,
                likes,
                dislikes,
                filterCommentToLike.created_at,
                filterCommentToLike.updated_at,
                filterCommentToLike.creator_id,
                filterCommentToLike.creator_name
            )

            const updateLikeDB = {
                user_id: payload.id,
                comment_id: id,
                like: 1
            } 

            const commentToLikeDB = commentToLike.toDBModel()

            await this.commentDatabase.updateComment(commentToLikeDB, id)
            
            await this.commentDatabase.updateLikeDislike(updateLikeDB)

            if(like === 0){
                const output = {
                    message: "'Dislike' realizado com sucesso!", 
                }
                return output
            } else if(like===1){
                const output = {
                    message: "'Like' realizado com sucesso!", 
                }
                return output
            }
        }

        // const likeDislikePostDB = await this.postDatabase.findPostWithCreatorId(id)

        // if (!likeDislikePostDB) {
        //     throw new NotFoundError("'id' não encontrado")
        // }

        // const userId = payload.id
        // const likeDB = like ? 1 : 0

        // if (likeDislikePostDB.creator_id === userId) {
        //     throw new BadRequestError("Quem criou o post não pode dar 'like' ou 'dislike' no mesmo")
        // }

        // const likeDislikeDB: LikesDislikesPostsDB = {
        //     user_id: userId,
        //     post_id: likeDislikePostDB.id,
        //     like: likeDB
        // }

        // const post = new Post(
        //     likeDislikePostDB.id,
        //     likeDislikePostDB.content,
        //     likeDislikePostDB.likes,
        //     likeDislikePostDB.dislikes,
        //     likeDislikePostDB.comments,
        //     likeDislikePostDB.created_at,
        //     likeDislikePostDB.updated_at,
        //     likeDislikePostDB.creator_id,
        //     likeDislikePostDB.creator_name
        // )

        // const likeDislikeExists = await this.postDatabase.findLikeDislike(likeDislikeDB)

        // if (likeDislikeExists === "already liked") {
        //     if (like) {
        //         await this.postDatabase.removeLikeDislike(likeDislikeDB)
        //         post.removeLike()
        //     } else {
        //         await this.postDatabase.updateLikeDislike(likeDislikeDB)
        //         post.removeLike() 
        //         post.addDislike()
        //     }
        // } else if (likeDislikeExists === "already disliked") {
        //     if (like) {
        //         await this.postDatabase.removeLikeDislike(likeDislikeDB)
        //         post.removeDislike()
        //         post.addLike()
        //     } else {
        //         await this.postDatabase.updateLikeDislike(likeDislikeDB)
        //         post.removeDislike()
        //     }
        // } else {
        //     await this.postDatabase.likeOrDislikePost(likeDislikeDB)

        //     like ? post.addLike() : post.addDislike()

        // }

        // const updatedPostDB = post.toDBModel()
        // await this.postDatabase.updatePost(updatedPostDB)

        // const output = this.postDTO.likeDislikePostOutput()

        // return output
    }
}