import { app } from "./app";

async function bootstrap() {
    await app.listen({
        port: 3001,
        host: "0.0.0.0"
    });

    console.log("Servidor rodando");
}

bootstrap();