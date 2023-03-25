export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
};

export interface UserDBCreated {
    name: string,
    email: string,
    password: string,
    created_at: string
}

export interface UserOutput{ 
    id:string,
    name:string,
    email:string,
    password: string,
    role:USER_ROLES,
    createdAt:string,
}

export interface PostModel {
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

export interface PostDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string,
}

export interface PostWithCreatorDB extends PostDB {
    creator_name: string
}

export interface LikesDislikesPostsDB {
    user_id: string,
    post_id: string,
    like: number
}

export interface CommentsDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface CommentWithCreatorDB{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    post_id: string,
    creator_id: string,
    creator_name: string
}

export interface PostModel{
    id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string,
    }
}

export interface CommentModel {
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
}
  
export interface CommentDB {
    id: string,
    creator_id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}
  
export interface CommentWithCreatorDB extends CommentDB {
    creator_name: string 
}

export interface LikeDislikeDB{
    user_id: string,
    post_id: string,
    like: number,
}

export interface LikeDislikeCommentDB{
    user_id: string,
    comment_id: string,
    like: number,
}