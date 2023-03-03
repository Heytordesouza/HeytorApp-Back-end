import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDTO } from "../dtos/UserDTO"
import { BaseError } from "../errors/BaseError"

export class UserController {
  constructor(
    private userDTO: UserDTO,
    private userBusiness: UserBusiness
){}

public loginUser = async (req: Request, res: Response) => {
    try {
      const input = this.userDTO.loginUserInput(
        req.body.email,
        req.body.password 
      )
  
      const output = await this.userBusiness.loginUser(input)
    
      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
      } else {
          res.status(500).send("Erro inesperado")
      }
    }
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      const input = this.userDTO.signupUserInput(
        req.body.name, 
        req.body.email, 
        req.body.password
      )

      const output = await this.userBusiness.signupUser(input)
        
      res.status(201).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
      } else {
          res.status(500).send("Erro inesperado")
      }
    }
  }

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string | undefined
    
      const output = await this.userBusiness.getAllUsers(name)
    
      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
      } else {
          res.status(500).send("Erro inesperado")
      }
    }
  }
}