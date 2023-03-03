import { UserDatabase } from "../database/UserDatabase"
import { GetUsersOutputDTO, LoginUserOutputDTO, SignupUserInputDTO, SignupUserOutputDTO, UserDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Users } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager, TokenPayload, USER_ROLES } from "../services/TokenManager"
import { UserDB } from "../types"

export class UserBusiness {
  constructor(
    private userDTO: UserDTO,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ){}


  public getAllUsers = async (name:string | undefined): Promise<GetUsersOutputDTO> =>{
    
    if (typeof name !== "string" && name !== undefined) {
      throw new BadRequestError("'name' deve ser string ou undefined")
    }

    const usersDB:UserDB[] = await this.userDatabase.findUser(name)

    const users: Users[] = usersDB.map((user)=>{
        return new Users(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at
        )
    })
    
    const output = this.userDTO.getUsersOutputDTO(users)

    return output
  }

  public signupUser = async (input: SignupUserInputDTO): Promise<SignupUserOutputDTO> => {
    const {name, email, password} = input

    const userVerification = await this.userDatabase.getUserByEmail(email)

      if(userVerification){
        throw new BadRequestError("'Email' já cadastrado")
    }

    const id = this.idGenerator.generate()

    const passwordHash = await this.hashManager.hash(password)

    const userInstance = new Users(
      id,
      name,
      email,
      passwordHash,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    )
  
    await this.userDatabase.insertUser(userInstance.userToDatabase())

    const tokenPayload: TokenPayload ={
      id: userInstance.getId(),
      name: userInstance.getName(),
      role: userInstance.getRole()
    }

    const token = this.tokenManager.createToken(tokenPayload)

    const output: SignupUserOutputDTO = {token: token}

    return(output)
  }

  public loginUser = async (input: any) => {
    const {email, password} = input

    const user = await this.userDatabase.getUserByEmail(email)

    if(!user){
      throw new NotFoundError("Usuário não encontrado")
    }

    const passwordHash = await this.hashManager.compare(password, user.password)

    if(!passwordHash){
      throw new BadRequestError("'email' ou 'password' incorretos")
    }

    const tokenPayload: TokenPayload ={
      id: user.id,
      name: user.name,
      role: user.role
    }

    const token = this.tokenManager.createToken(tokenPayload)

    const output: LoginUserOutputDTO = {token: token}

    return(output)
  }
}