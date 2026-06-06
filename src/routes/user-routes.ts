import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user-controller";
import { IUser, IUserPropsLogin } from "../types/user-type";
import { authMiddleware } from "../middlewares/auth-middleware";
import { UserModel } from "../model/user-model";
import { UserService } from "../services/user-service";
import { AuthService } from "../services/auth-service";

export async function userRoutes(app: FastifyInstance) {
    const userModel = new UserModel()
    const authService = new AuthService()
    const userService = new UserService(userModel, authService)
    const userController = new UserController(userService)

    app.post<{ Body: IUser }>("/user/create", async (request, reply) => {
       await userController.create(request, reply)
    });

    app.post<{ Body: IUserPropsLogin }>("/user/login", async (request, reply) => {
        return await userController.login(request, reply)
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
