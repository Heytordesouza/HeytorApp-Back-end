import { Request, Response } from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDTO } from "../dtos/CommentDTO"
import { BaseError } from "../errors/BaseError"

export class CommentController {
    constructor(
        private commentDTO: CommentDTO,
        private commentBusiness: CommentBusiness
    ) { }

    public createComment = async (req: Request, res: Response) => {
        try {
        
            const postId = req.params.id
            const token = req.headers.authorization
            const content = req.body.content

            const input = this.commentDTO.createCommentInput(postId, token, content)

            const output = await this.commentBusiness.createComment(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editComment = async (req: Request, res: Response) => {
        try {

            const id = req.params.id
            const token = req.headers.authorization
            const content = req.body.content

            const input = this.commentDTO.editCommentInput(id, token, content)

            const output = await this.commentBusiness.editComment(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteComment = async (req: Request, res: Response) => {
        try {

            const id = req.params.id
            const token = req.headers.authorization

            const input = this.commentDTO.deleteCommentInput(id, token)

            const output = await this.commentBusiness.deleteComment(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeDislikeComment = async (req: Request, res: Response) => {
        try {

            const id = req.params.id
            const token = req.headers.authorization
            const like = req.body.like

            const input = this.commentDTO.likeDislikeCommentInput(id, token, like)

            const output = await this.commentBusiness.likeDislikeComment(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

}