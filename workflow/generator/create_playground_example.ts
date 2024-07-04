import { generateFAQForExample } from '../claude';
import { createOrUpdatePlaygroundExample, getPlaygroundExample } from '../strapi';

const PLAYGROUND_EXAMPLES: {
    unique_id: string;
    name: string;
    description: string;
    config_url: string;
    imageURL: string;
    color: "purple";
}[] = [
    {
        unique_id: "create-email-assistant",
        name: "Create Email Assistant",
        description: "Create an email assistant that can help you create emails.",
        config_url: "https://www.google.com/maps",
        imageURL: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        color: "purple"
    }
];

// DON'T CHANGE THE BELOW CODE
async function main() {
    for (const example of PLAYGROUND_EXAMPLES) {
        console.log("Creating tool", example.unique_id);

        const strapiApp = await getPlaygroundExample(example.unique_id);
        let FAQ = await generateFAQForExample(example.unique_id);
        if (!strapiApp) {
            await createOrUpdatePlaygroundExample(example, strapiApp?.id)
        }
    }

}

main();

