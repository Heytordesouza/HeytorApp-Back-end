import { BadRequestError } from "../errors/BadRequestError"

export interface GetAllPostsInputDTO {
    q: string,
    token: string,
}

export interface GetPostsInputDTO {
    id: string,
    token: string,
}

export interface InsertInputPostDTO {
    content: string,
    token: string,
}

export interface InsertInputCommentDTO {
    id_post: string,
    content: string,
    token: string,
}

export interface UpdateInputDTO {
    id: string,
    content: string,
    token: string,
}

export interface DeleteInputPostDTO {
    id: string,
    token: string,
}

export interface LikeDislikeDTO {
    id: string,
    like: number,
    token: string,
}

export class PostDTO {

    getAllPostsInput = (q: string, token: string): GetAllPostsInputDTO => {

        if (typeof token !== "string") {
            throw new BadRequestError("'Token' não informado!")
        }

        const result: GetAllPostsInputDTO = {
            q,
            token,
        }
        return result
    }

    getPostInput = (id: string, token: string): GetPostsInputDTO => {

        if (typeof token !== "string") {
            throw new BadRequestError("'Token' não informado!")
        }

        const result: GetPostsInputDTO = {
            id,
            token
        }
        return result
    }

    insertInputPost = (content: string, token: string): InsertInputPostDTO => {

        if (typeof token !== "string") {
            throw new BadRequestError("'Token' não informado!")
        }

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' precisa ser uma string")
            }
        } else {
            throw new BadRequestError("Favor, informar o 'content'")
        }

        const result: InsertInputPostDTO = {
            content,
            token,
        }

        return result
    }

    InsertInputComment = (id_post: string, content: string, token: string): InsertInputCommentDTO => {

        if (typeof token !== "string") {
            throw new BadRequestError("'Token' não informado!")
        }

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' precisa ser uma string")
            }
        } else {
            throw new BadRequestError("Favor, informar o 'content'")
        }

        const result: InsertInputCommentDTO = {
            id_post,
            content,
            token,
        }

        return result
    }

    updateInputPost = (id: string, content: string, token: string): UpdateInputDTO => {

        if (typeof token !== "string") {
            throw new BadRequestError("'Token' não informado!")
        }

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' precisa ser uma string")
            }
        } else {
            throw new BadRequestError("Favor, informar o 'content'")
        }

        const result: UpdateInputDTO = {
            id,
            content,
            token,
        }

        return result
    }

    deleteInputPost = (id: string, token: string): DeleteInputPostDTO => {

        if (typeof token !== "string") {
            throw new BadRequestError("'Token' não informado!")
        }

        const result: DeleteInputPostDTO = {
            id,
            token,
        }

        return result
    }



    likeDislike = (id: string, like: number, token: string): LikeDislikeDTO => {

        if (typeof token !== "string") {
            throw new BadRequestError("'Token' não informado!")
        }

        const result: LikeDislikeDTO = {
            id,
            like,
            token,
        }

        return result
    }

} 