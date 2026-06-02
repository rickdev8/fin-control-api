import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user-controller";
import { IUser, IUserPropsLogin } from "../types/user-type";
import { authMiddleware } from "../middlewares/auth-middleware";

export async function userRoutes(app: FastifyInstance) {
    const userController = new UserController();

    app.post<{ Body: IUser }>("/user/create", async (request, reply) => {
        userController.create(request, reply)
    });

    app.post<{ Body: IUserPropsLogin }>("/user/login", async (request, reply) => {
        return userController.login(request, reply)
    });

    app.get(
        "/user/profile",
        {
            preHandler: [authMiddleware]
        },
        async (request, reply) => {
            return {
                user: request.user
            };
        }
    );
}
