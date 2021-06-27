import { Request, Response } from "express";
import { ForgotPasswordService } from "../services/ForgotPasswordService";

class ForgotPasswordController {

    async handle(request: Request, response: Response) {
        const { email } = request.body;

        const forgotPasswordService = new ForgotPasswordService();

        const result = await forgotPasswordService.execute(email)

        return response.json(result);
    }

}

export { ForgotPasswordController };