import { IUser } from "../types/user-type";

export class UserEntity {

    private readonly _id: string;
    private _name: string;
    private _email: string;
    private _age: number;
    private _password: string;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(user: IUser) {

        this._id = user.id;
        this._name = user.name;
        this._email = user.email;
        this._age = user.age;
        this._password = user.password;
        this._createdAt = user.createdAt;
        this._updatedAt = user.updatedAt;

        this.validateName();
        this.validateEmail();
        this.validateAge();
        this.validatePassword();
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get age(): number {
        return this._age;
    }

    public get password(): string {
        return this._password;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public get isAdult(): boolean {
        return this._age >= 18;
    }

    private validateName(): void {

        if (this._name.trim().length < 3) {
            throw new Error(
                "Name must contain at least 3 characters"
            );
        }
    }

    private validateEmail(): void {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(this._email)) {
            throw new Error("Invalid Email");
        }
    }

    private validateAge(): void {

        if (this._age < 0 || this._age > 120) {
            throw new Error("Invalid age");
        }
    }

    private validatePassword(): void {

        const hasMinLength =
            this._password.length >= 8;

        const hasUpperCase =
            /[A-Z]/.test(this._password);

        const hasNumber =
            /\d/.test(this._password);

        if (
            !hasMinLength ||
            !hasUpperCase ||
            !hasNumber
        ) {
            throw new Error(
                "Password must contain at least 8 characters, one uppercase letter and one number"
            );
        }
    }

    public changeName(name: string): void {

        if (name.trim().length < 3) {
            throw new Error("Invalid name");
        }

        this._name = name;

        this.touch();
    }

    public changeEmail(email: string): void {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error("Invalid email");
        }

        this._email = email;

        this.touch();
    }

    public changePassword(password: string): void {

        const hasMinLength =
            password.length >= 8;

        const hasUpperCase =
            /[A-Z]/.test(password);

        const hasNumber =
            /\d/.test(password);

        if (
            !hasMinLength ||
            !hasUpperCase ||
            !hasNumber
        ) {
            throw new Error(
                "Weak password"
            );
        }

        this._password = password;

        this.touch();
    }

    private touch(): void {
        this._updatedAt = new Date();
    }

    public toJSON() {

        return {
            id: this._id,
            name: this._name,
            email: this._email,
            age: this._age,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        };
    }
}