import Fastify from "fastify";
import { AppError } from "../errors/app-erros";


const app = Fastify();

app.setErrorHandler((error, request, reply) => {

    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
            message: error.message
        });
    }

    console.error(error);

    return reply.status(500).send({
        message: "Internal Server Error"
    });
});