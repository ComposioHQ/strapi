import { generateFAQForType} from "../claude";
import { createOrUpdateTag, findTag } from "../strapi";

const useCaseTagsToCreate: {slug: string, name: string, type: "usecasetype" | "tooltype", description: string}[] = [{
  slug: "coding-review-assistant",
  name: "Coding Review Assistant",
  type: "usecasetype",
  description: "Analyzes code, detects errors, suggests improvements, and enhances code quality.",
}];


(async () => {
    for (const tag of useCaseTagsToCreate) {
        const existingTag = await findTag(tag.slug);
        const faq = await generateFAQForType(tag.name);
        await createOrUpdateTag({
            slug: tag.slug,
            name: tag.name,
            type: tag.type,
            description: tag.description,
            faq: faq || []
        }, existingTag?.id)
}
})();
