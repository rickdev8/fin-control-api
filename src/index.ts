import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { routes } from './routes';

async function bootstrap() {
    const app = fastify();

    await app.register(cors);

    await app.register(jwt, {
        secret: process.env.JWT_SECRET || 'SegredoSuperSecreto'
    });

    await app.register(routes);

    await app.listen({
        port: 3000,
        host: '0.0.0.0'
    });

    console.log('Servidor rodando');
}

bootstrap();