import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { Comment } from "../models/Comment"
import { PostModel } from "../types"

export interface GetPostInputDTO {
    token: string | undefined
}

export type GetPostOuputDTO = PostModel[]

export interface GetPostByIdInputDTO {
    id: string,
    token: string | undefined
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

export interface CreatePostInputDTO {
    token: string | undefined,
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
    token: string | undefined,
    content: string
}

export interface UpdatePostOutputDTO {
    message: string,
    content: string
}

export interface DeletePostInputDTO {
    id: string,
    token: string | undefined
}

export interface DeletePostOutputDTO {
    message: string
}

export interface LikeDislikePostInputDTO {
    id: string,
    token: string | undefined
    like: number
}

export interface LikeDislikePostOutputDTO {
    message: string
}

export class PostDTO {
    public getPostInput(
        token: unknown
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
        id: unknown,
        token: undefined
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

    public getPostByIdOutput(post: Post, comment: Comment): GetPostByIdOuputDTO {
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
        id: unknown,
        token: unknown,
        like: unknown
    ): LikeDislikePostInputDTO {
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' deve ser string")
        }

        if (typeof like !== "number") {
            throw new BadRequestError("'like' deve ser boolean")
        }

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