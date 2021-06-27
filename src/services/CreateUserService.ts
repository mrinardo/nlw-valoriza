import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { classToPlain } from "class-transformer"
import { hash } from "bcryptjs";
import validator from "validator";


interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        if (!email || !validator.isEmail(email)) {
            throw new Error("Incorrect email");
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Password not strong enough")
        }

        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
            reset_password_token_used: false
        });

        await usersRepository.save(user);

        return classToPlain(user);
    }
}

export { CreateUserService };