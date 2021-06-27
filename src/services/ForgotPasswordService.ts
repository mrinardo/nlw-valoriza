import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import crypto from "crypto"
import EmailSender from "../utils/EmailSender";

class ForgotPasswordService {
    async execute(email: string) {
        let resetToken;

        crypto.randomBytes(48, (err, buf) => {
            if (err) throw new Error("Unable to generate token for password reset");
            resetToken = buf.toString("hex");
            return resetToken;
        });

        const usersRepository = getCustomRepository(UsersRepository);

        let userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            const expireAt = new Date(Date.now());
            expireAt.setDate(expireAt.getDate() + 1);

            userAlreadyExists.reset_password_token = resetToken;
            userAlreadyExists.reset_password_expires_at = expireAt;
            userAlreadyExists.reset_password_token_used = false;

            await usersRepository.save(userAlreadyExists);

            EmailSender.sendResetPasswordMail(userAlreadyExists.email, resetToken);
        }

        return { message: "Check your e-mail" };
    }
}

export { ForgotPasswordService }