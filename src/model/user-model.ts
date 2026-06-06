
import { prisma } from "../database/prisma-instance";
import { IUserPropsModel } from "../types/user-type";

export class UserModel {
   
    async create(user: IUserPropsModel) {
    
        const created = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                age: user.age,
                password: user.password
            }
        });
    
        return created;
    }


    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
}