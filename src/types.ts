import { USER_ROLES } from "./services/TokenManager"

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

export interface PostDB{
    id: string,
    creator_id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface CommentDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    post_id: string,
}

export interface CommentWithCreatorDB{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    post_id: string,
    creator:{
        creator_id: string,
        name: string,
    }
}

export interface PostbyUsersDB{
    id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        name: string,
    }
}

export interface PostWithCommentsDB{
    id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        name: string,
    },
    comments_post: CommentWithCreatorDB,
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