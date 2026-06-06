
import { UserEntity } from "../entities/user-entitie";
import { CredentialsInvalidError } from "../errors/CredentialsInvalidError";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.ts";
import { UserModel } from "../model/user-model";
import { IUser, IUserPropsLogin, IUserPropsModel } from "../types/user-type";
import bcrypt from "bcrypt";
import { AuthService } from "./auth-service";

export class UserService {

    constructor(private userModel: UserModel, private authService: AuthService) {}

    async create(data: IUser) {
        const userEntity = new UserEntity(data)

        if (await this.userModel.findByEmail(data.email)) {
            throw new UserAlreadyExistsError()
        }

        const hashPassword = await bcrypt.hash(userEntity.password, 10)

        await this.userModel.create({...data, password: hashPassword, age: Number(data.age)})

        return userEntity.toJSON()
    }

    async login(data: IUserPropsLogin) {

        const user = await this.userModel.findByEmail(data.email);

        if (!user) throw new CredentialsInvalidError();
        
        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) throw new CredentialsInvalidError();
        
        const { password, ...userResponse } = user;

        return { user: userResponse, token: this.authService.generateToken(user)
        }
    }

}