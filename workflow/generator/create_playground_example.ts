import { generateFAQForExample } from '../claude';
import { createOrUpdatePlaygroundExample, getPlaygroundExample } from '../strapi';

const PLAYGROUND_EXAMPLES: {
    unique_id: string;
}[] = [
    {
        unique_id: "pr_agent_2"
    },

];

// DON'T CHANGE THE BELOW CODE
async function main() {
    for (const example of PLAYGROUND_EXAMPLES) {
        console.log("Creating tool", example.unique_id);

        const playgroundExample = await getPlaygroundExample(example.unique_id);
        let FAQ = await generateFAQForExample(example.unique_id);

        console.log("FAQ", FAQ);
        if (!!playgroundExample) {
            console.log("Updating tool", example.unique_id);
            await createOrUpdatePlaygroundExample({ ...playgroundExample, faq: FAQ},playgroundExample?.id)
        }
    }

}

main();

