import { UserDatabase } from "../database/UserDatabase"
import { LoginUserInputDTO, LoginUserOutputDTO, SignupUserInputDTO, SignupUserOutputDTO, UserDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Users } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload, USER_ROLES } from "../types"

export class UserBusiness {
  constructor(
    private userDTO: UserDTO,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ){}

  public signupUser = async (input: SignupUserInputDTO): Promise<SignupUserOutputDTO> => {
    const {name, email, password} = input

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      throw new BadRequestError("O email deve ter o formato 'exemplo@exemplo.com'.")
    }

    if (!password.match(/^.{4,15}$/)) {
      throw new BadRequestError("'password' deve possuir entre 4 e 15 caracteres")
    }

    const userVerification = await this.userDatabase.findUser(email)

    if(userVerification){
      throw new BadRequestError("'email' já cadastrado")
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

  public loginUser = async (input: LoginUserInputDTO): Promise<LoginUserOutputDTO> => {
    const {email, password} = input

    const userDBExists = await this.userDatabase.findUser(email)

    if(!userDBExists){
      throw new NotFoundError("'email' incorreto ou não cadastrado")
    }

    const user = new Users(
      userDBExists.id,
      userDBExists.name,
      userDBExists.email,
      userDBExists.password,
      userDBExists.role,
      userDBExists.created_at
    )

    const hashedPassword = user.getPassword()

    const passwordHash = await this.hashManager.compare(password, hashedPassword)

    if(!passwordHash){
      throw new BadRequestError("'Senha' incorreta")
    }

    const tokenPayload: TokenPayload ={
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }

    const token = this.tokenManager.createToken(tokenPayload)

    const output: LoginUserOutputDTO = {token: token}

    return(output)
  }
}