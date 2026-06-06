import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { AppError } from "./errors/app-erros";
import { routes } from "./routes";
import cookie from "@fastify/cookie";

export const app = Fastify();

app.register(cors, {
    origin: "http://localhost:3000",
    credentials: true
});

await app.register(cookie, {
    secret: process.env.COOKIE_SECRET
});

app.register(jwt, {
    secret: process.env.JWT_SECRET || "SegredoSuperSecreto"
});

app.register(routes);

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