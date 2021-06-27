import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class ResetPasswordController {

    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        const { resetToken } = request.params;

        const resetPasswordService = new ResetPasswordService();

        const user = await resetPasswordService.execute(email, resetToken, password)

        return response.json(user);
    }

}

export { ResetPasswordController };