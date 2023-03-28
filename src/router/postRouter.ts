import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { PostDTO } from "../dtos/PostDTO";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router()

const postController = new PostController(
    new PostDTO(),
    new PostBusiness(
        new PostDTO(),
        new CommentDatabase(),
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()      
    )
)

postRouter.get("/", postController.getPosts)
postRouter.get("/:id", postController.getPostsbyId)
postRouter.post("/", postController.insertNewPost)
postRouter.put("/:id", postController.updatePost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeDislikePost)