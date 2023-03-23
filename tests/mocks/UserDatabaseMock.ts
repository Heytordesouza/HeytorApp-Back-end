import { BaseDatabase } from "../../src/database/BaseDatabase"
import { UserDB } from "../../src/types"
import { USER_ROLES } from "../../src/services/TokenManager"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public findUser = async (email: string): Promise<UserDB | undefined> => {
        switch (email) {
            case "normal@email.com":
                return {
                    id: "id-mock",
                    name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-SenhaTeste",
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString(),
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-SenhaTeste",
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString(),
                }
            default:
                return undefined
        }
    }

    public insertUser = async (userDB: UserDB): Promise<void> =>{ }
}