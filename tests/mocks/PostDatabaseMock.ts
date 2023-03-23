import { CommentWithCreatorDB, PostDB, PostbyUsersDB, LikeDislikeCommentDB, CommentDB, LikeDislikeDB } from "../../src/types"
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes_posts"
    public static TABLE_COMMENTS = "comments"

    public async getAllPosts(): Promise<PostbyUsersDB[]> {
        return [
            {
                id: "id-mock",
                content: "Conteúdo do post",
                comments: 0,
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator: {
                    id: "id-mock",
                    name: "Normal Mock",
                }
            }
        ]
    }

    public async getPostWithComments(id: string): Promise<PostbyUsersDB | undefined> {
        if (id === "id-mock-post") {
            return {
                id: "id-mock-post",
                content: "Conteúdo do post",
                comments: 0,
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator: {
                    id: "id-mock",
                    name: "Normal Mock",
                }
            }
        }
    }

    public async getPostById(id: string): Promise<PostDB | undefined> {
        if(id === "id-mock-post")
        return {
            id: "id-mock-post",
            creator_id: "id-mock",
            content: "Conteúdo do post",
            comments: 0,
            likes: 0,
            dislikes: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
    }

    public async getCommentById(id: string): Promise<CommentWithCreatorDB | undefined> {
        if (id === "id-mock-post") {
            return {
                id: "id-mock-comments",
                post_id: "id-mock-post",
                content: "Conteúdo do comentário",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator:{
                    creator_id: "id-mock",
                    name: "Normal Mock"
                }
            }
        }
    }

    public async getLikeDislikeByPostId(likeDislike: LikeDislikeDB): Promise<void> { }

    public async getLikeDislikeByCommentId(likeDislike: LikeDislikeCommentDB): Promise<void> { }

    public async insertNewPost(newPostDB: PostDB): Promise<void> { }

    public async insertComment(newCommentDB: CommentDB): Promise<void> { }

    public async updatePost(postDB: PostDB): Promise<void> { }

    public async updateComment(commentDB: CommentDB): Promise<void> { }

    public async deletePostbyId(id: string): Promise<void> { }

    public async deleteCommentsbyId(id: string): Promise<void> { }

    public async deleteLikeDislike(id: LikeDislikeDB): Promise<void> { }

    public async removeLikeDislike(id: LikeDislikeCommentDB): Promise<void> { }

    public async likeDislike(likeDislike: LikeDislikeDB): Promise<void> { }

    public async updateLikeDislike(likeDislike: LikeDislikeDB): Promise<void> { }

    public async updateLikeDislikeComment(likeDislike: LikeDislikeCommentDB): Promise<void> { }


    
}