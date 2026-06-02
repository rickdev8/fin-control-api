import jwt from "jsonwebtoken";
import { IUser } from "../types/user-type";

export class AuthService {
    generateToken(user: IUser) {
        return jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET || "SegredoSuperSecreto",
            {
                expiresIn: "1d"
            }
        );
    }
}