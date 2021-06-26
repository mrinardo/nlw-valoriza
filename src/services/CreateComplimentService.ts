import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { TagsRepository } from "../repositories/TagsRepository";
import EmailSender from "../utils/EmailSender";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}


class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepository);
        const usersRepository = getCustomRepository(UsersRepository);
        const tagsRepository = getCustomRepository(TagsRepository);

        if (user_sender === user_receiver) {
            throw new Error("User Sender and Receiver must not be the same!");
        }

        const userReceiver = await usersRepository.findOne(user_receiver);
        const userSender = await usersRepository.findOne(user_sender);
        const tag = await tagsRepository.findOne(tag_id);

        if (!userReceiver) {
            throw new Error("User Receiver does not exist!");
        }

        if (!tag) {
            throw new Error("Tag does not exist!");
        }

        const compliment = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentsRepository.save(compliment);

        EmailSender.sendComplimentMail(userReceiver.email, userSender.name, tag.name, message);

        return compliment;
    }
}

export { CreateComplimentService }