import { AppError } from "./app-erros";

export class CredentialsInvalidError extends AppError {
    constructor() {
        super("Email ou senha incorretos!", 401)
    }
}