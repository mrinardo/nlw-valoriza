import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"

class ListComplimentsSentByUserService {
    async execute(user_id) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {
                user_sender: user_id
            }
        })

        return compliments;
    }
}

export { ListComplimentsSentByUserService }