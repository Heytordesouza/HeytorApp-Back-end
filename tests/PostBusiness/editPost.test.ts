import { PostBusiness } from "../../src/business/PostBusiness"
import { PostDTO } from "../../src/dtos/PostDTO"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../../tests/mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../tests/mocks/TokenManagerMock"
import { UpdatePostInputDTO } from "../../src/dtos/PostDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock"

describe("editPost", () => {
    const postBusiness = new PostBusiness(
        new PostDTO(),
        new PostDatabaseMock(),
        new CommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("retornar erro caso o 'content' não seja preenchido", async () => {
        expect.assertions(2)
        try {
            const input: UpdatePostInputDTO = {
                id: "id-mock-post",
                token: "token-mock-normal",
                content: ""
            }
            await postBusiness.updatePost(input)
            
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'content' não pode ser nada")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar erro caso 'token' não seja válido", async () => { 
        expect.assertions(2)

        try {
            const input: UpdatePostInputDTO = {
                id: "id-mock-post",
                token: "token-mock",
                content: "Conteúdo do post"
            }
            await postBusiness.updatePost(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' não válido!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar erro caso 'id' não seja encontrado", async () => { 
        expect.assertions(2)
        try {
            const input: UpdatePostInputDTO = {
                id: "i",
                token: "token-mock-normal",
                content: "Conteúdo do post"
            }
            await postBusiness.updatePost(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'id' não encontrado")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("garantir que o post seja editado", async () => {
        const input: UpdatePostInputDTO = {
            id: "id-mock-post",
            token: "token-mock-normal",
            content: "Conteúdo do post"
        }
        const response = await postBusiness.updatePost(input)

        expect(response).toEqual({
            message: "Post editado com sucesso",
            content:  "Conteúdo do post"
        })
    })
})