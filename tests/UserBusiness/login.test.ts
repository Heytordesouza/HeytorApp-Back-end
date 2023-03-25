import { UserBusiness } from "../../src/business/UserBusiness"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { LoginUserInputDTO, UserDTO } from "../../src/dtos/UserDTO"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { BadRequestError } from "../../src/errors/BadRequestError"

describe("login", () => {
    const userBusiness = new UserBusiness(
        new UserDTO(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("login em conta de usuário retornando token", async () => {
        const input: LoginUserInputDTO = {
            email: "normal@email.com",
            password: "SenhaTeste"
        }

        const response = await userBusiness.loginUser(input)
        expect(response.token).toBe("token-mock-normal")
    })


    test("login em conta admin retornando token", async () => {
        const input: LoginUserInputDTO = {
            email: "admin@email.com",
            password: "SenhaTeste"
        }

        const response = await userBusiness.loginUser(input)
        expect(response.token).toBe("token-mock-admin")
    })

    test("retornar erro caso 'password' esteja incorreta", async () => {
        expect.assertions(2)
        try {
            const input: LoginUserInputDTO = {
                email: "admin@email.com",
                password: "senha"
            }
            await userBusiness.loginUser(input)

        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("'Senha' incorreta")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("retornar erro caso 'email' não seja encontrado", async () => {
        expect.assertions(2)
        try {
            const input: LoginUserInputDTO = {
                email: "email@emailllllllllll.com",
                password: "SenhaTeste"
            }

            await userBusiness.loginUser(input)

        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("'email' incorreto ou não cadastrado")
                expect(error.statusCode).toBe(404)
            }
        }
    })

    

    

    

    

    

    

})