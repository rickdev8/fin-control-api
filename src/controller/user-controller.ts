import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user-service";
import { IUser, IUserPropsLogin } from "../types/user-type";

export class UserController {

    constructor(private userService: UserService) { }

    async create(request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) {

        const user = await this.userService.create(request.body)
        reply.send(user)

    }

    async login(request: FastifyRequest<{ Body: IUserPropsLogin }>, reply: FastifyReply) {

        const result = await this.userService.login(request.body)

        reply
            .setCookie("token", result.token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            })
            .send({
                user: result.user
            });

    }
}