
import { addApp } from './strapi';

async function main() {
    // const apps = await getApps();
    // console.log(apps);
    addApp({
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
        FAQ: [{
            question: 'What is check name',
            answer: 'My name is test'
        }],
    },7)
}

main();
