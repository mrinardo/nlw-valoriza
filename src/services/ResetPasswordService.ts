import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import { classToPlain } from "class-transformer"
import { hash } from "bcryptjs";
import validator from "validator";

class ResetPasswordService {
    async execute(email: string, resetToken: string, password: string) {
        const today = new Date(Date.now());

        if (!email || !validator.isEmail(email)) {
            throw new Error("Incorrect email");
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Password not strong enough");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        let userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            if (userAlreadyExists.reset_password_token == resetToken && userAlreadyExists.reset_password_token_used == false && userAlreadyExists.reset_password_expires_at >= today) {
                const passwordHash = await hash(password, 8);

                userAlreadyExists.reset_password_token_used = true;
                userAlreadyExists.password = passwordHash;

                await usersRepository.save(userAlreadyExists);

                return { "message": "Password changed successfully" };
            }
        }

        console.log(userAlreadyExists.reset_password_expires_at);
        console.log(today);

        throw new Error("Unable to reset password");
    }
}

export { ResetPasswordService }