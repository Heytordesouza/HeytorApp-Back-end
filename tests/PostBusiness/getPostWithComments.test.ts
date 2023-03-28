import { PostBusiness } from "../../src/business/PostBusiness"
import { PostDTO } from "../../src/dtos/PostDTO"
import { IdGeneratorMock } from "../../tests/mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../tests/mocks/TokenManagerMock"
import { GetPostByIdInputDTO } from "../../src/dtos/PostDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"

describe("getPostWithComments", () => {
    const postBusiness = new PostBusiness(
        new PostDTO(),
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve disparar erro caso 'token' não seja válido", async () => { 
        expect.assertions(2)

        try {
            const input: GetPostByIdInputDTO = {
                id: "id-mock-post",
                token: "token-mock"
            }
            await postBusiness.getPostsById(input)
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
            const input: GetPostByIdInputDTO = {
                id: "id-mock",
                token: "token-mock-normal"
            }
            await postBusiness.getPostsById(input)
        } catch (error) {
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Post' não localizado")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("retornar um post específico com os comentários", async () => {
        const input: GetPostByIdInputDTO = {
            id: "id-mock-post",
            token: "token-mock-normal"
        }

        const response = await postBusiness.getPostsById(input)
        expect(response).toEqual([{
            id: "id-mock-post",
            content: "Conteúdo do post",
            likes: 0,
            dislikes: 0,
            comments: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            creator: {
                id: "id-mock",
                name: "Normal Mock"
            },
            comment: [{
                id: "id-mock-comments",
                postId: "id-mock-post",
                content: "Conteúdo do comentário",
                likes: 0,
                dislikes: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: {
                    id: "id-mock",
                    name: "Normal Mock"
                }
            }]
        }])
    })
})