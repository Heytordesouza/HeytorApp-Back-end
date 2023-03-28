import { Request,Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController{
    constructor(
        private postDTO: PostDTO,
        private postBusiness: PostBusiness
    ){}

    public getPosts = async(req:Request, res:Response)=>{
        try {
            
            const input = {
                token: req.headers.authorization as string
            }  
            
            const output = await this.postBusiness.getPosts(input)

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

    public getPostsbyId = async(req:Request, res:Response)=>{
        try {

            const input = {
                id:req.params.id,
                token: req.headers.authorization as string
            }  
            
            const output = await this.postBusiness.getPostsById(input)

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

    public insertNewPost = async(req:Request, res:Response)=>{
        try {

            const token = req.headers.authorization
            const content = req.body.content
            
            const input = this.postDTO.createPostInput(token, content)

            const output = await this.postBusiness.insertNewPost(input)
                
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

    public updatePost = async (req:Request, res: Response)=>{
        try {
            
            const id = req.params.id
            const token = req.headers.authorization
            const content = req.body.content

            const input = this.postDTO.updatePostInput(id, token, content)

            const output = await this.postBusiness.updatePost(input)

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

    public deletePost = async (req:Request, res: Response)=>{
        try {

            const id = req.params.id
            const token = req.headers.authorization

            const input = this.postDTO.deletePostInput(id, token)

            const output = await this.postBusiness.deletePost(input)

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

    public likeDislikePost = async (req:Request, res: Response)=>{
        try {

            const input = {
                id: req.params.id,
                like: req.body.like,
                token: req.headers.authorization as string,
            }

            const output = await this.postBusiness.likeDislikePost(input)

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