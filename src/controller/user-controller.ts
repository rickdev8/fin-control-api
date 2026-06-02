import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user-service";
import { IUser, IUserPropsLogin } from "../types/user-type";

export class UserController {
    async create(request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) {
        try {
            const user = await new UserService().create(request.body)
            reply.send(user)
        } catch(err){
            reply.send(err)
        }
    }

    async login(request: FastifyRequest<{ Body: IUserPropsLogin }>, reply: FastifyReply) {
        try {
            const user = await new UserService().login(request.body)
            return reply.status(200).send(user)
        } catch (err) {
            return reply.status(500).send(err)
        }
    }
}