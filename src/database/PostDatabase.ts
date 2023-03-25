import { PostDB, PostWithCreatorDB, CommentWithCreatorDB, LikesDislikesPostsDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static POSTS_TABLE = "posts"
    public static COMMENTS_TABLE = "comments"
    public static LIKEDISLIKE_TABLE = "likes_dislikes_posts"

    public async getPosts(): Promise<PostWithCreatorDB[]> {
        const result: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.POSTS_TABLE)
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.comments",
                "posts.created_at",
                "posts.updated_at",
                "posts.creator_id",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")
            return result
    }

    public async insertPost(newPostDB: PostDB):Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.POSTS_TABLE)
            .insert(newPostDB)
    }

    public getPostsWithComments = async(id:string): Promise<PostWithCreatorDB | undefined> => {
        const [posts]: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.POSTS_TABLE)
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.comments",
                "posts.created_at",
                "posts.updated_at",
                "posts.creator_id",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where({ "posts.id": id })
        return posts
    }

    public async findComments(id: string):Promise<CommentWithCreatorDB | undefined> {
        const [comments]: CommentWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.COMMENTS_TABLE)
            .select(
                "comments.id ",
                "comments.post_id ",
                "comments.content ",
                "comments.likes",
                "comments.dislikes ",
                "comments.created_at ",
                "comments.updated_at ",
                "comments.creator_id",
                "users.name AS creator_name"
            )
            .join("users", "comments.creator_id", "=", "users.id")
            .where({ "comments.post_id": id })

        return comments

    }

    public async findPost(id: string): Promise<PostDB | undefined> {
        const [postDB]: PostDB[] | undefined = await BaseDatabase
            .connection(PostDatabase.POSTS_TABLE)
            .select()
            .where({ id })

        return postDB
    }

    public async updatePost(postDB: PostDB):Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.POSTS_TABLE)
            .update(postDB)
            .where({ id: postDB.id })
    }

    public async deletePost(id: string):Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.LIKEDISLIKE_TABLE)
            .delete()
            .where({ post_id: id })

        await BaseDatabase
            .connection(PostDatabase.COMMENTS_TABLE)
            .delete()
            .where({ post_id: id })

        await BaseDatabase
            .connection(PostDatabase.POSTS_TABLE)
            .delete()
            .where({ id: id })
    }

    public async findPostWithCreatorId(id: string): Promise<PostWithCreatorDB | undefined> {
        const result: PostWithCreatorDB[] | undefined = await BaseDatabase
            .connection(PostDatabase.POSTS_TABLE)
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.comments",
                "posts.created_at",
                "posts.updated_at",
                "posts.creator_id",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", id)

        return result[0]
    }

    public likeDislike = async(user_id:string, post_id: string):Promise<LikesDislikesPostsDB | undefined>=>{
        const [likeDislikeDB]:LikesDislikesPostsDB[] | undefined = await BaseDatabase
       .connection(PostDatabase.LIKEDISLIKE_TABLE)
       .select()
       .where({user_id, post_id})

       return likeDislikeDB
   }

    public async likeOrDislikePost(likeDislike: LikesDislikesPostsDB):Promise<void> {
        await BaseDatabase.connection(PostDatabase.LIKEDISLIKE_TABLE)
            .insert(likeDislike)
    }

    public async findLikeDislike(likeDislike: LikesDislikesPostsDB) {
        const [likeDislikeDB]: LikesDislikesPostsDB[] = await BaseDatabase
            .connection(PostDatabase.LIKEDISLIKE_TABLE)
            .select()
            .where({
                user_id: likeDislike.user_id,
                post_id: likeDislike.post_id
            })
        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ? "already liked" : "already disliked"
        } else {
            return null
        }
    }

    public async removeLikeDislike(likeDislike: LikesDislikesPostsDB):Promise<void> {
        await BaseDatabase.connection(PostDatabase.LIKEDISLIKE_TABLE)
            .delete()
            .where({
                user_id: likeDislike.user_id,
                post_id: likeDislike.post_id
            })
    }

    public async updateLikeDislike(likeDislike: LikesDislikesPostsDB):Promise<void> {
        await BaseDatabase.connection(PostDatabase.LIKEDISLIKE_TABLE)
            .update(likeDislike)
            .where({
                user_id: likeDislike.user_id,
                post_id: likeDislike.post_id
            })
    }

}