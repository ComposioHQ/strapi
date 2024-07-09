import { createOrUpdateApp, createOrUpdateToolCombo, getApp, getToolCombo, getTools } from '../strapi';
import { getActionsNTriggers, getFAQForTools } from '../claude';

const sortArray = (array: any[]) => {
    return array.sort((a, b) => a.attributes.unique_id.localeCompare(b.attributes.unique_id));
}
// DON'T CHANGE THE BELOW CODE
async function main() {
    const tools = await getTools();

   for(let i = 0; i < tools.length; i++) {
        const first = tools[i];
       for(let j = i+1; j < tools.length; j++) {
        const second = tools[j];
        const combineUniqueId =  sortArray([first, second]);

           const name = "connect" + combineUniqueId[0].attributes.name + "_and_" + combineUniqueId[1].attributes.name;
           
           console.log("Checking tool combo", name);
           const toolCombo = await getToolCombo(name);
           if(!!toolCombo.data) {
            console.log("Tool combo already exists", name);
            continue;
           }

           const firstToolId = combineUniqueId[0].id;
           const secondToolId = combineUniqueId[1].id;

           const desc = "Connect " + combineUniqueId[0].attributes.name + " and " + combineUniqueId[1].attributes.name;
        
           console.log("Creating tool combo", name);
           await createOrUpdateToolCombo({unique_id: name, description: desc, first_tool: firstToolId, second_tool: secondToolId});
       }
   }
}

main();