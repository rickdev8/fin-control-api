export interface IUser {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserPropsModel {
    name: string;
    email: string;
    age: number;
    password: string;
}

export interface IUserPropsLogin {
    email: string;
    password: string;
}