
import { createOrUpdateApp, getApp } from './strapi';
import { getFAQForTools } from './claude';
import { getAppsFromBE, getAppFromBE, getActionsFromBE, getTriggersFromBE } from './getApps';

async function main() {
    const apps = await getAppsFromBE();
    for (const app of apps.items) {
        //@ts-ignore
        const [appFromBE, actions, triggers] = await Promise.all([
            getAppFromBE(app.key),
            getActionsFromBE(app.key) as Promise<{items:{name:string,display_name:string,description:string; tags:string[]}[]}>,
            getTriggersFromBE(app.key) as Promise<{ name: string, display_name: string, description: string }[]>
        ]);
        const parsedActions = []
        for (const action of actions.items) {
            parsedActions.push({
                name: action.name,
                desc: action.description?.substring(0, 200),
                tag: action.tags?.[0],
                unique_id: action.name
            })
        }


      
        const parsedTriggers = []
        for (const trigger of triggers) {
            parsedTriggers.push({
                name: trigger.name,
                unique_id: trigger.name,
                desc: trigger.description?.substring(0, 200),
                tag: "Main"
            })
        }

  
        const strapiApp = await getApp(appFromBE.key);
        await createOrUpdateApp({
            name: appFromBE.name,
            logo: appFromBE.logo,
            unique_id: appFromBE.key,
            description: appFromBE?.description,
            tool_type: 'api',
            website_link: appFromBE.website_link,
            playground_config: "",
            actions: parsedActions,
            triggers: parsedTriggers,
            examples: [],
            tags: [],
            //@ts-ignore
            ...(!strapiApp?.id ? {} : {})
        }, strapiApp?.id)

        console.log("App created/updated", app.key);
    }
    // const app = await getApp("slack");
    // let FAQ;
    // if(!app){
    //     FAQ = await getFAQForTools('slack', {});
    // }
    // createOrUpdateApp({
    //     name: '7new',
    //     logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLeFIomqX-ERD64nb6ZBVbuL8H90IuyA3uw&s',
    //     unique_id: 'slack',
    //     description: 'Slack is a team communication tool that facilitates collaboration via messaging, file sharing, and integrations.',
    //     tool_type: 'local',
    //     website_link: 'https://slack.com',
    //     playground_config: "",
    //     actions: [{
    //         name: 'Send message to channel',
    //         desc: 'Send message to channel',
    //         tag: 'Channel Info',
    //         unique_id: 'send_message_to_channel'
    //     }],
    //     triggers: [{
    //         name: 'Receive slack message',
    //         unique_id: 'receive_slack_message',
    //         desc: 'Receive slack message',
    //         tag: 'Channel'
    //     }],
    //     examples: [],
    //     tags: [],
    //     //@ts-ignore
    //    ...(!app.id ? {FAQ: FAQ} : {})
    // },app.id)
}

main();
