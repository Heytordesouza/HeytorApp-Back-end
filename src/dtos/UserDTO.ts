import { BadRequestError } from "../errors/BadRequestError"

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

    public signupUsersOutput(token: string):SignupUserOutputDTO{
        const dto: SignupUserOutputDTO = {
            token
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

    public loginUserOutput(token: string): LoginUserOutputDTO{
        const dto:LoginUserOutputDTO = {
            token
        }
        return dto
    }
}