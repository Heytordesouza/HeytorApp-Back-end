import { CommentDB, CommentWithCreatorDB, LikeDislikeCommentDB, PostWithCreatorDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class CommentDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"

    public async insertComment(newCommentDB: CommentDB): Promise<void> {}

    public async findPost(id: string): Promise<PostWithCreatorDB | undefined> {
        if (id === "id-mock-post")
            return {
                id: "id-mock-post",
                creator_id: "id-mock-normal",
                content: "Conteúdo do comentário",
                likes: 0,
                dislikes: 0,
                comments: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "Normal Mock"
            }
    }

    public async findComment(id: string): Promise<CommentDB | undefined> {
        if (id === "id-mock-comment") {
            return {
                id: "id-mock-comment",
                post_id: "id-mock-post",
                content: "Conteúdo do comentário",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock"
            }
        }
    }

    public async updateCommentsInPosts(id: string): Promise<void> { }

    public async updateComment(commentDB: CommentDB): Promise<void> { }

    public async deleteComment(id: string): Promise<void> { }

    public async findCommentWithCreatorId(id: string): Promise<CommentWithCreatorDB | undefined> {
        if (id === "id-mock-comment") {
            return {
                id: "id-mock-comment",
                post_id: "id-mock-post",
                content: "Conteúdo do comentário",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock-normal",
                creator_name: "Normal Mock" 
            }
        }
    }

    public async likeOrDislikeComment(likeDislike: LikeDislikeCommentDB): Promise<void> { }

    public async findLikeDislike(likeDislike: LikeDislikeCommentDB) {
        const likeDislikeDB = {
                user_id: "id-mock-normal",
                comment_id: "id-mock-comment",
                like: 0
            }
        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ? "already liked" : "already disliked"
        } else {
            return null
        }
    }

    public async removeLikeDislike(likeDislike: LikeDislikeCommentDB): Promise<void> { }

    public async updateLikeDislike(likeDislike: LikeDislikeCommentDB): Promise<void> { }
}