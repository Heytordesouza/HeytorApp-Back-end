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