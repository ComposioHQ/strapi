
import { createOrUpdateApp, getApp } from './strapi';
import { getFAQForTools } from './claude';

async function main() {
    const app = await getApp("slack");


    let FAQ;
    if(!app){
        FAQ = await getFAQForTools('slack', {});
    }
    createOrUpdateApp({
        name: '7new',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLeFIomqX-ERD64nb6ZBVbuL8H90IuyA3uw&s',
        unique_id: 'slack',
        description: 'Slack is a team communication tool that facilitates collaboration via messaging, file sharing, and integrations.',
        tool_type: 'local',
        website_link: 'https://slack.com',
        playground_config: "",
        actions: [{
            name: 'Send message to channel',
            desc: 'Send message to channel',
            tag: 'Channel Info',
            unique_id: 'send_message_to_channel'
        }],
        triggers: [{
            name: 'Receive slack message',
            unique_id: 'receive_slack_message',
            desc: 'Receive slack message',
            tag: 'Channel'
        }],
        examples: [],
        tags: [],
       ...(!app.id ? {FAQ: FAQ} : {})
    },app.id)
}

main();
