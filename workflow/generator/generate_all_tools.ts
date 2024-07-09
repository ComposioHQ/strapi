import { createOrUpdateToolCombo, getToolCombo, getTools } from '../strapi';

// Sort an array of objects by their unique_id attribute
const sortArray = (array: any[]) => {
    return array.sort((a, b) => a.attributes.unique_id.localeCompare(b.attributes.unique_id));
}

// Main function to generate all tool combos
async function main() {
    const tools = await getTools();

    // Iterate through all tool pairs
    for (let i = 0; i < tools.length; i++) {
        const first = tools[i];
        for (let j = i + 1; j < tools.length; j++) {
            const second = tools[j];
            const combinedUniqueIds = sortArray([first, second]);

            // Generate a unique name for the tool combo
            const name = `connect_${combinedUniqueIds[0].attributes.name.toLowerCase()}_and_${combinedUniqueIds[1].attributes.name.toLowerCase()}`;
            console.log(`👀 Checking tool combo ${i}|${j} of ${tools.length} : ${name}`);
            const toolCombo = await getToolCombo(name);

            // Skip if the tool combo already exists
            if (!!toolCombo) {
                console.log("🚫 Tool combo already exists", name);
                continue;
            }

            const firstToolId = combinedUniqueIds[0].id;
            const secondToolId = combinedUniqueIds[1].id;

            const desc = `Connect ${combinedUniqueIds[0].attributes.name} and ${combinedUniqueIds[1].attributes.name}`;

            console.log("✨ 1. Creating tool combo", name);
            await createOrUpdateToolCombo({ unique_id: name, description: desc, first_tool: firstToolId, second_tool: secondToolId }, toolCombo?.id);
        }
    }
}

main();
