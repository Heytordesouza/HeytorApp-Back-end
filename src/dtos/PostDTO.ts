import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { Comment } from "../models/Comment"
import { CommentModel, PostModel } from "../types"

export interface GetPostInputDTO {
    token: string | undefined
}

export type GetPostOuputDTO = PostModel[]

export interface GetPostByIdInputDTO {
    id: string,
    token: string 
}

export type GetPostECommentsByIdOuputDTO = {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    },
    comment: [{
        id: string,
        postId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string,
        creator: {
            id: string,
            name: string
        }
    }]
}

export interface GetCommentsByPostIdInput {
    postId: string,
    token: string | undefined
}

export type GetCommentsByPostOutput = CommentModel[]

export type GetCommentOuputDTO = {
    comment: [{
        id: string,
        postId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string,
        creator: {
            id: string,
            name: string
        }
    }]
}

export type GetPostByIdOuputDTO = {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface CreatePostInputDTO {
    token: string,
    content: string
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        id: string,
        content: string,
        likes: number,
        dislikes: number,
        comments: number,
        createdAt: string,
        updatedAt: string,
        creatorId: string,
        creatorName: string
    }
}

export interface UpdatePostInputDTO {
    id: string,
    token: string,
    content: string
}

export interface UpdatePostOutputDTO {
    message: string,
    content: string
}

export interface DeletePostInputDTO {
    id: string,
    token: string
}

export interface DeletePostOutputDTO {
    message: string
}

export interface LikeDislikePostInputDTO {
    id: string,
    token: string,
    like: number
}

export interface LikeDislikePostOutputDTO {
    message: string
}

export class PostDTO {
    public getPostInput(
        token: string
    ): GetPostInputDTO {

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }

        const dto: GetPostInputDTO = {
            token
        }

        return dto
    }

    public getPostByIdInput(
        id: string,
        token: string
    ): GetPostByIdInputDTO {
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }

        const dto: GetPostByIdInputDTO = {
            id,
            token
        }

        return dto
    }

    public getPostECommentsByIdOutput(post: Post, comment: Comment): GetPostECommentsByIdOuputDTO {
        const dto: GetPostECommentsByIdOuputDTO = {
            id: post.getId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            comments: post.getComments(),
            createdAt: post.getCreatedAt(),
            updatedAt: post.getUpdatedAt(),
            creator: {
                id: post.getCreatorId(),
                name: post.getCreatorName()
            },
            comment: [{
                id: comment.getId(),
                postId: comment.getPostId(),
                content: comment.getContent(),
                likes: comment.getLikes(),
                dislikes: comment.getDislikes(),
                createdAt: comment.getCreatedAt(),
                updatedAt: comment.getUpdatedAt(),
                creator: {
                    id: comment.getCreatorId(),
                    name: comment.getCreatorName()
                }
            }]
        }
        return dto
    }

    public getPostByIdOutput(post: Post): GetPostByIdOuputDTO {
        const dto: GetPostByIdOuputDTO = {
            id: post.getId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            comments: post.getComments(),
            createdAt: post.getCreatedAt(),
            updatedAt: post.getUpdatedAt(),
            creator: {
                id: post.getCreatorId(),
                name: post.getCreatorName()
            },
        }
        return dto
    }

    public createPostInput(
        token: unknown,
        content: unknown
    ): CreatePostInputDTO {

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }
        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const dto: CreatePostInputDTO = {
            token,
            content
        }
        return dto
    }

    public createPostOutput(post: Post): CreatePostOutputDTO {
        const dto: CreatePostOutputDTO = {
            message: "Post criado com sucesso",
            post: {
                id: post.getId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                comments: post.getComments(),
                createdAt: post.getCreatedAt(),
                updatedAt: post.getUpdatedAt(),
                creatorId: post.getCreatorId(),
                creatorName: post.getCreatorName()
            }
        }
        return dto
    }

    public updatePostInput(
        id: unknown,
        token: unknown,
        content: unknown
    ): UpdatePostInputDTO {
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }
        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const dto: UpdatePostInputDTO = {
            id,
            token,
            content
        }
        return dto
    }

    public updatePostOutput(post: Post): UpdatePostOutputDTO {
        const dto: UpdatePostOutputDTO = {
            message: "Post editado com sucesso",
            content: post.getContent()
        }
        return dto
    }

    public deletePostInput(
        id: unknown,
        token: unknown
    ): DeletePostInputDTO {
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }

        const dto: DeletePostInputDTO = {
            id,
            token
        }
        return dto
    }

    public deletePostOutput(): DeletePostOutputDTO {
        const dto: DeletePostOutputDTO = {
            message: "Post excluído com sucesso",
        }
        return dto
    }

    public likeDislikePostInput(
        id: string,
        token: string,
        like: number
    ): LikeDislikePostInputDTO {
        // if (typeof id !== "string") {
        //     throw new BadRequestError("'id' deve ser string")
        // }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }

        // if (typeof like !== "number") {
        //     throw new BadRequestError("'like' deve ser 1 ou 0")
        // }

        const dto: LikeDislikePostInputDTO = {
            id,
            token,
            like
        }
        return dto
    }

    public likeDislikePostOutput(): LikeDislikePostOutputDTO {
        const dto: LikeDislikePostOutputDTO = {
            message: "Você interagiu no post"
        }
        return dto
    }
}