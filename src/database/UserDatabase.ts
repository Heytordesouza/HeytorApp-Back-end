import { BaseDatabase } from "./BaseDatabase"
import { UserDB } from "../types"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "users"

    public findUser = async (name: string | undefined): Promise <UserDB[]> => {
        let result
    
        if (name) {
          const usersDB: UserDB[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .where("name", "LIKE", `%${name}%`)
    
          result = usersDB
    
        } else {
          const usersDB: UserDB[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          result = usersDB
        }
    
        return result
    }

    public insertUser = async (newUserDB: UserDB): Promise <void> => {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(newUserDB)
    }

    public findUserById = async (id: string) :Promise<UserDB| undefined>=> {
        const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return userDB
    }

    public getUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [result]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })
        return result
    }
}