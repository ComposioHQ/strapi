import { createOrUpdateApp, getApp } from '../strapi';
import { getActionsNTriggers, getFAQForTools } from '../claude';

const TOOLS_TO_CREATE = [
    {
        key: "google-maps",
        name: "Google Maps",
        logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        website_link: "https://www.google.com/maps",
        description: "Google Maps is a web service that allows users to search for and view maps, including directions, street view, and other related information."
    }
]

// DON'T CHANGE THE BELOW CODE
async function main() {
    for (const app of TOOLS_TO_CREATE) {
        console.log("Creating tool", app.key);
        const parsedActions: ActionOrTrigger[] = []; // Explicitly type the array
        const parsedTriggers: ActionOrTrigger[] = []; // Explicitly type the array
  
        const strapiApp = await getApp(app.key);
        let FAQ = [];
        if(!strapiApp){
            //@ts-ignore
            const [actionsNTriggers] = await Promise.all([
                getActionsNTriggers(app.key),
            ]);
            for (const actionOrTrigger of actionsNTriggers.items) {
                if (actionOrTrigger.type === "action") {
                    parsedActions.push({
                        name: actionOrTrigger.name,
                        desc: actionOrTrigger.description?.substring(0, 200),
                        tag: "",
                        unique_id: actionOrTrigger.name
                    });
                }
                if (actionOrTrigger.type === "trigger") {
                    parsedTriggers.push({
                        name: actionOrTrigger.name,
                        unique_id: actionOrTrigger.name,
                        desc: actionOrTrigger.description?.substring(0, 200),
                        tag: "",
                    });
                }
            }
            FAQ = await getFAQForTools(app.key, {});
        }
        await createOrUpdateApp({
            name: app.name,
            logo: app.logo,
            unique_id: app.key,
            description: app.description,
            tool_type: 'api',
            website_link: app.website_link,
            playground_config: "",
            actions: [],
            triggers: [],
            examples: [],
            tags: [],
            //@ts-ignore
            ...(!strapiApp?.id ? {
                FAQ: FAQ,
                actions: parsedActions as ActionOrTrigger[],
                triggers: parsedTriggers as ActionOrTrigger[],
            } : {
                
            })
        }, strapiApp?.id)

        console.log("App created/updated", app.key);
    }

}

main();

type ActionOrTrigger = {
    name: string;
    desc: string;
    tag: string;
    unique_id: string;
};