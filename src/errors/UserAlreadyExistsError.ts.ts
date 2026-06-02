import { AppError } from "./app-erros";

export class UserAlreadyExistsError extends AppError {
    constructor() {
        super("Usuário já cadastrado", 409)
    }
}