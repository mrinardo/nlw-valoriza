
import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { sign } from "jsonwebtoken";
import { UsersRepository } from "../repositories/UsersRepository"

interface IAuthenticationRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticationRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new Error("Email or password is incorrect");
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Email or password is incorrect");
        }

        const token = sign(
            {
                email: user.email
            },
            "$EdfRg6&H5fGHd#fFgH#fY35#E4&**",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService }