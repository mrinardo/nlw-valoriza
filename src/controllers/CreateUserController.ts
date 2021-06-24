import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";



class CreateUserController {

    async handle(requset: Request, response: Response) {
        const { name, email, admin, password } = requset.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, admin, password })

        return response.json(user);
    }

}

export { CreateUserController };