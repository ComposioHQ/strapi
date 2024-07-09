

import { createOrUpdateToolCombo, getToolCombo, getTools } from '../strapi';

// Sort an array of objects by their unique_id attribute
const sortArray = (array: any[]) => {
    return array.sort((a, b) => a.attributes.unique_id.localeCompare(b.attributes.unique_id));
}

// Generate a single tool combo
const generateToolCombo = (first: any, second: any) => {
    const combinedUniqueIds = sortArray([first, second]);
    const name = `connect_${combinedUniqueIds[0].attributes.name.toLowerCase()}_and_${combinedUniqueIds[1].attributes.name.toLowerCase()}`;
    const firstToolId = combinedUniqueIds[0].id;
    const secondToolId = combinedUniqueIds[1].id;
    const desc = `Connect ${combinedUniqueIds[0].attributes.name} and ${combinedUniqueIds[1].attributes.name}`;

    return { name, firstToolId, secondToolId, desc };
}

// Process a batch of tool combos
async function processBatch(batch: any[]) {
    const results = await Promise.all(batch.map(async ({ name, firstToolId, secondToolId, desc }) => {
        console.log(`👀 Checking tool combo: ${name}`);
        const toolCombo = await getToolCombo(name);

        if (!!toolCombo) {
            console.log("🚫 Tool combo already exists", name);
            return null;
        }

        console.log("✨ Creating tool combo", name);
        return createOrUpdateToolCombo({ unique_id: name, description: desc, first_tool: firstToolId, second_tool: secondToolId }, toolCombo?.id);
    }));

    return results.filter(result => result !== null);
}

// Main function to generate all tool combos
async function main() {
    const tools = await getTools();
    const batchSize = 7;
    let batch = [];

    for (let i = 0; i < tools.length; i++) {
        for (let j = i + 1; j < tools.length; j++) {
            batch.push(generateToolCombo(tools[i], tools[j]));

            if (batch.length === batchSize) {
                await processBatch(batch);
                batch = [];
            }
        }
    }

    // Process any remaining items in the last batch
    if (batch.length > 0) {
        await processBatch(batch);
    }
}

main();