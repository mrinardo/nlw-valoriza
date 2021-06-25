import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"

class ListComplimentsReceivedByUserService {
    async execute(user_id) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {
                user_receiver: user_id
            }
            //,relations: ["userSender", "UserReceiver", "tag"]
        })

        return compliments;
    }
}

export { ListComplimentsReceivedByUserService }