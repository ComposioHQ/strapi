import { createOrUpdateApp, getApp } from '../strapi';
import { getActionsNTriggers, getFAQForTools, getToolDescription } from '../claude';

const removeDuplicates = (arr: string[]): string[] => [...new Set(arr)];

const generateUniqueId = (app: string): string => app.toLowerCase().replace(/\s/g, "_");

const commerceApps = [
    "Stripe",
    "Shopify",
    "Kajabi",
];

// Main function to create new tools
async function main() {
    const uniqueApps = removeDuplicates(commerceApps);
    const batchSize = 7;
    
    for (let i = 0; i < uniqueApps.length; i += batchSize) {
        const batch = uniqueApps.slice(i, i + batchSize);
        await Promise.all(batch.map(app => createNewTool(app)));
    }
}

// Function to create a new tool
const createNewTool = async (appName: string) => {
    const { description, website_link } = await getToolDescription(appName);

    const toolDetails = {
        key: generateUniqueId(appName),
        name: appName,
        logo: null,
        website_link,
        description
    };

    const strapiApp = await getApp(toolDetails.key);
    
    if (!strapiApp?.id) {
        const parsedActions: ActionOrTrigger[] = [];
        const parsedTriggers: ActionOrTrigger[] = [];
        let FAQ: { question: string; answer: string }[] = [];

        const actionsNTriggers = await getActionsNTriggers(toolDetails.key);

        for (const item of actionsNTriggers.actions_triggers) {
            const commonFields = {
                name: item.name,
                desc: item.description?.substring(0, 200) || "",
                tag: "",
                unique_id: item.unique_id
            };

            if (item.type === "action") {
                parsedActions.push(commonFields);
            } else if (item.type === "trigger") {
                parsedTriggers.push(commonFields);
            }
        }

        // Uncomment if FAQ is needed
        // FAQ = await getFAQForTools(toolDetails.key, {});

        await createOrUpdateApp({
            name: toolDetails.name,
            logo: toolDetails.logo || "",
            unique_id: toolDetails.key,
            description: toolDetails.description,
            tool_type: 'api',
            website_link: toolDetails.website_link,
            playground_config: "",
            actions: parsedActions,
            triggers: parsedTriggers,
            examples: [],
            tags: [58],
            FAQ
        });

        console.log("App created", toolDetails.key);
    } else {
        console.log("App already exists", toolDetails.key);
    }
};

main();

type ActionOrTrigger = {
    name: string;
    desc: string;
    tag: string;
    unique_id: string;
};
