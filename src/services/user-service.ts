
import { UserEntity } from "../entities/user-entitie";
import { CredentialsInvalidError } from "../errors/CredentialsInvalidError";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.ts";
import { UserModel } from "../model/user-model";
import { IUser, IUserPropsLogin, IUserPropsModel } from "../types/user-type";
import bcrypt from "bcrypt";
import { AuthService } from "./auth-service";

export class UserService {
    async create(data: IUser) {
        const userEntity = new UserEntity(data)
        const userModel = new UserModel()

        if (await userModel.findByEmail(data.email)) {
            throw new UserAlreadyExistsError()
        }

        const hashPassword = await bcrypt.hash(userEntity.password, 10)

        let user: IUserPropsModel = {
            name: data.name,
            age: data.age,
            email: data.email,
            password: hashPassword
        }

        await userModel.create(user)

        return userEntity.toJSON()
    }

    async login(data: IUserPropsLogin) {
        const authService = new AuthService()
        const userModel = new UserModel();
        const user =
            await userModel.findByEmail(data.email);

        if (!user) {
            throw new CredentialsInvalidError();
        }

        const passwordMatch =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!passwordMatch) {
            throw new CredentialsInvalidError();
        }


        const { password, ...userResponse } = user;

        return {
            user: userResponse,
            token: authService.generateToken(user)
        }
    }

}