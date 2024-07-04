import { getActionsNTriggers, getFAQForTools, getToolsForUseCase, getUseCasesForTheme } from "./claude";
import { createOrUpdateTag } from "./strapi";


(async () => {
    // const tools = await getACtionsNTriggers("salesforce", {});
    // const tools = await getToolsForUseCase("Developer productivity or coding review on github", {});
    // const useCases = await getUseCasesForTheme("Developer productivity", {});
    // //const faq = await getFAQForTools("Developer productivity", {});
    // console.log(useCases);

    await createOrUpdateTag({
        slug: "coding-review-assistant",
        name: "Coding Review Assistant",
        type: "usecaseType",
        description: "An AI assistant that helps review and improve code quality.",
        faq: []
    })
})();
