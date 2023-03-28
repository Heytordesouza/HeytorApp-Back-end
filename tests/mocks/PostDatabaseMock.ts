import { CommentWithCreatorDB, LikesDislikesPostsDB, PostDB, PostWithCreatorDB } from "../../src/types"
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes_posts"
    public static TABLE_COMMENTS = "comments"

    public async getPosts(): Promise<PostWithCreatorDB[]> {
        return [
            {
                id: "id-mock",
                content: "Conteúdo do post",
                likes: 0,
                dislikes: 0,
                comments: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock",
                creator_name: "Normal Mock"
            }
        ]
    }

    public async insertPost(newPostDB: PostDB): Promise<void> {
        
    }

    public async getPostsWithComments(id: string): Promise<PostWithCreatorDB | undefined> {
        if (id === "id-mock-post") {
            return {
                id: "id-mock-post",
                creator_id: "id-mock",
                content: "Conteúdo do post",
                likes: 0,
                dislikes: 0,
                comments: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "Normal Mock"
            }
        }
    }

    public async findComments(id: string): Promise<CommentWithCreatorDB | undefined> {
        if (id === "id-mock-post") {
            return {
                id: "id-mock-comments",
                post_id: "id-mock-post",
                content: "Conteúdo do comentário",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_id: "id-mock",
                creator_name: "Normal Mock"  
            }
        }
    }

    public async findPost(id: string): Promise<PostWithCreatorDB | undefined> {
        if(id === "id-mock-post")
        return {
            id: "id-mock-post",
            creator_id: "id-mock",
            content: "Conteúdo do post",
            likes: 0,
            dislikes: 0,
            comments: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            creator_name: "Normal Mock"
        }
    }

    public async updatePost(postDB: PostDB): Promise<void> {

    }

    public async deletePost(id: string): Promise<void> {

    }

    public async findPostWithCreatorId(id: string): Promise<PostWithCreatorDB | undefined> {
        if(id === "id-mock-post"){
            return {
                id: "id-mock-post",
                creator_id: "id-mock-normal",
                content: "Conteúdo do post",
                likes: 0,
                dislikes: 0,
                comments: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "Normal Mock"
            }
        }
    }

    public async likeOrDislikePost(likeDislike: LikesDislikesPostsDB): Promise<void> {

    }

    public async likeDislike(userId: string, postId: string):Promise<LikesDislikesPostsDB | undefined> {
        const likeDislikeDB = {
            user_id: "id-mock-normal",
            post_id: "id-mock-post",
            like: 0
        }

        return likeDislikeDB
    }

    public async findLikeDislike(likeDislike: LikesDislikesPostsDB) {
        const likeDislikeDB = {
            user_id: "id-mock-normal",
            post_id: "id-mock-post",
            like: 0
        }

        if (likeDislikeDB) {
            return likeDislike.like === 1 ? "already liked" : "already disliked"
        } else {
            return null
        }
    }

    public async removeLikeDislike(likeDislike: LikesDislikesPostsDB): Promise<void> {

    }

    public async updateLikeDislike(likeDislike: LikesDislikesPostsDB): Promise<void> {

    }

}