import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repositories/TagsRepository"
import { classToPlain } from "class-transformer"

class ListTagsService {
    async execute() {
        const tagsRepository = getCustomRepository(TagsRepository);

        //let tags = await tagsRepository.find();
        //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));

        const tags = await tagsRepository.find();

        return classToPlain(tags);
    }
}

export { ListTagsService }