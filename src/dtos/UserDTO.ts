import { BadRequestError } from "../errors/BadRequestError"
import { Users } from "../models/Users"
import { USER_ROLES } from "../services/TokenManager"
import { UserOutput } from "../types"

export interface GetUsersOutputDTO{
    users:{
        id:string,
        name:string,
        email:string,
        password: string,
        role:USER_ROLES,
        createdAt:string,
    }[]
}

export interface SignupUserInputDTO {
    name: string,
    email: string,
    password: string
}

export interface SignupUserOutputDTO {
    token: string
}

export interface LoginUserInputDTO {
    email: string,
    password: string
}

export interface LoginUserOutputDTO {
    token: string
}

export class UserDTO {

    public getUsersOutputDTO = (users:Users[]) : GetUsersOutputDTO => {
        const getUsers : UserOutput[]= 
        users.map((user)=> user.getUserOutput())
        const dto : GetUsersOutputDTO = {
            users: getUsers        
        }

        return dto
    }

    public signupUserInput = (name: unknown, email: unknown, password: unknown): SignupUserInputDTO => {

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }
          
        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }
          
        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
          
        const dto: SignupUserInputDTO = {
        name,
        email,
        password
        }

        return dto
    }

    public loginUserInput = (email: unknown, password: unknown): LoginUserInputDTO => {

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }
          
        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        
        const dto: LoginUserInputDTO = {
        email,
        password
        }
    
        return dto
    }
}