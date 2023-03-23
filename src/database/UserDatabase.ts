import { BaseDatabase } from "./BaseDatabase"
import { UserDB } from "../types"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "users"

    public async findUser(email: string){
        const [usersDB]: UserDB[] | undefined [] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({email})        
        return usersDB
    }

    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }
}