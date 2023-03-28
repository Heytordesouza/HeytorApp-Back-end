import { PostBusiness } from "../../src/business/PostBusiness"
import { PostDTO } from "../../src/dtos/PostDTO"
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../../tests/mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../tests/mocks/TokenManagerMock"
import { GetPostInputDTO } from "../../src/dtos/PostDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"

describe("getPosts", () => {
    const postBusiness = new PostBusiness(
        new PostDTO(),
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve disparar erro caso o 'token' não seja válido", async () => { 
        expect.assertions(2)

        try {
            const input: GetPostInputDTO = {
                token: "token-mock"
            }
            await postBusiness.getPosts(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' não válido!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("retornar a lista de 'posts'", async () => {
        const input: GetPostInputDTO = {
            token: "token-mock-normal"
        }
        const response = await postBusiness.getPosts(input)
        expect(response).toEqual([
            {
                id: "id-mock",
                content: "Conteúdo do post",
                likes: 0,
                dislikes: 0,
                comments: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator:{
                    id: "id-mock",
                    name: "Normal Mock"
                }
            }
        ])
    })
})