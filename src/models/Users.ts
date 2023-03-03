import { USER_ROLES } from "../services/TokenManager"
import { UserDB, UserOutput } from "../types"

export class Users{
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:USER_ROLES,
        private created_at:string
    ){}


    public getId():string {
        return this.id
    }

    public setId(newId:string): void{
        this.id = newId
    }

    public getName(): string {
        return this.name
    }

    public setName(newName:string): void{
        this.name = newName
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(newEmail:string): void{
        this.email = newEmail
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(newPassword:string): void{
        this.password = newPassword
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(newRole: USER_ROLES): void{
        this.role = newRole
    }

    public getCreatedAt(): string{
        return this.created_at
    }

    public setCreatedAt(newCreated_at:string): void{
        this.created_at = newCreated_at
    }

    public getUserOutput():UserOutput{
        return {
        id:this.id,
        name:this.name,
        email:this.email,
        password:this.password,
        role:this.role,
        createdAt:this.created_at,
        }
    }

    public userToDatabase():UserDB{
        return{
            id:this.id,
            name:this.name,
            email:this.email,
            password:this.password,
            role:this.role,
            created_at:this.created_at,
        }
    }
}