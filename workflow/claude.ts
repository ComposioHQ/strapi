import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

export const getFAQForTools = async (toolsName: string, tools: any) => {
    const params: Anthropic.MessageCreateParams = {
        max_tokens: 1024,

        model: 'claude-3-opus-20240229',
        tools:[
            {
                "name": "get_faq",
                "description": "Get the FAQs for a given tool",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "faq_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "question": { "type": "string", "description": "question" },
                                    "answer": { "type": "string", "description": "answer" },
                                },
                                "required": ["question", "answer"]
                            },
                            "description": "FAQ list"
                        },
 
                    },
                    "required": ["faq_list"]
                }
            }
        ],
        "tool_choice": { "type": "tool", "name": "get_faq" },
        messages: [{ role: 'user', content: `Hi` }, {
            role: 'assistant',
            content: `You are assistant that copywrites for Composio. Composio make it easy to build AI agent using code, and it provides tools for agentic framework like CrewAI, langchain and works with openAI, claude and other LLM.`,
        },{
            role: 'user',
            content: `Generate relevant 2 FAQs for ${toolsName}`
        }],
    };
    const message: Anthropic.Message = await anthropic.messages.create(params);
    //@ts-ignore
    return message.content[0].input.faq_list;

};


export const getToolDescription = async (toolName: string): Promise<{ description: string; website_link: string }> => {
    console.log(`Getting description and website link for ${toolName}`)
    const params: Anthropic.MessageCreateParams = {
        max_tokens: 1024,
        model: 'claude-3-haiku-20240307',
        tools: [
            {
                "name": "get_tool_info",
                "description": "Get the description and website link for a given tool",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "description": { "type": "string", "description": "A brief description of the tool" },
                        "website_link": { "type": "string", "description": "The official website link for the tool" }
                    },
                    "required": ["description", "website_link"]
                }
            }
        ],
        "tool_choice": { "type": "tool", "name": "get_tool_info" },
        messages: [
            { role: 'user', content: `Hi` },
            {
                role: 'assistant',
                content: `You are an AI assistant tasked with providing information about various software tools and services.`,
            },
            {
                role: 'user',
                content: `Provide a brief description and the official website link for ${toolName}`
            }
        ],
    };
    const message: Anthropic.Message = await anthropic.messages.create(params);
    //@ts-ignore
    return message.content[0].input;
};

export const getActionsNTriggers = async (toolsName: string): Promise<{items:{name:string,description:string; type:string,unique_id:string}[]}> => {
    console.log(`List relevant 20 actions and triggers for ${toolsName}`)
    const params: Anthropic.MessageCreateParams = {
        max_tokens: 4096,
        model: 'claude-3-5-sonnet-20240620',
        tools: [
            {
                "name": "get_actions_triggers",
                "description": "Get the actions and triggers for a given tool",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "actions_triggers": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "unique_id": { "type": "string", "description": "unique id for the action or trigger" },
                                    "name": { "type": "string", "description": "name of the action or trigger" },
                                    "description": { "type": "string", "description": "description of the action or trigger under 60 words" },
                                     "type": { "type": "string", "description": "type of the action or trigger" },
                                },
                                "required": ["name"]
                            },
                            "description": "List of actions and triggers for a given tool"
                        },
                    },
                    "required": ["actions_triggers"]
                }
            }
        ],
        "tool_choice": { "type": "tool", "name": "get_actions_triggers" },
        messages: [
            { role: 'user', content: `Hi` },
            {
                role: 'assistant',
                content: `You are developers building integration for tools like Slack, Zoom, etc. You need to generate list of actions and triggers for the tool.`,
            },
            {
                role: 'user',
                content: `Generate list of 30 actions and triggers for ${toolsName}`
            }
        ],
    };
    const message: Anthropic.Message = await anthropic.messages.create(params);
    //@ts-ignore
    return message.content[0].input;
};

export const getUseCasesForTheme = async (theme: string, tools: any) => {
    console.log(`List relevant use cases for ${theme}`)
    const params: Anthropic.MessageCreateParams = {
        max_tokens: 4096,
        model: 'claude-3-haiku-20240307',
        tools: [
            {
                "name": "get_use_cases",
                "description": "Get a list of use cases for a given theme",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "use_cases": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string", "description": "name of the use case" },
                                    "description": { "type": "string", "description": "description of the use case under 60 words" },
                                },
                                "required": ["name"]
                            },
                            "description": "List of end user use case for a given theme which can use AI agent/ LLM or AI workflow"
                        },
                    },
                    "required": ["use_cases"]
                }
            }
        ],
        "tool_choice": { "type": "tool", "name": "get_use_cases" },
        messages: [
            { role: 'user', content: `Hi` },
            {
                role: 'assistant',
                content: ` Generate a list of relevant use cases for a given theme.`,
            },
            {
                role: 'user',
                content: `Generate list of 30 use cases for ${theme}`
            }
        ],
    };
    const message: Anthropic.Message = await anthropic.messages.create(params);
    //@ts-ignore
    return message.content[0].input;
};

export const getToolsForUseCase = async (useCase: string, tools: any) => {
    console.log(`List relevant tools for ${useCase}`)
    const params: Anthropic.MessageCreateParams = {
        max_tokens: 4096,
        model: 'claude-3-haiku-20240307',
        tools: [
            {
                "name": "get_tools",
                "description": "Get a list of tools for a given use case",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "tools": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string", "description": "name of the tool" },
                                    "description": { "type": "string", "description": "description of the tool under 60 words" },
                                },
                                "required": ["name"]
                            },
                            "description": "List of tools for a given use case which can use AI agent/ LLM or AI workflow"
                        },
                    },
                    "required": ["tools"]
                }
            }
        ],
        "tool_choice": { "type": "tool", "name": "get_tools" },
        messages: [
            { role: 'user', content: `Hi` },
            {
                role: 'assistant',
                content: `You are a developer building applications for various domains. You need to generate a list of relevant tools for a given use case.`,
            },
            {
                role: 'user',
                content: `Generate list of 30 tools for ${useCase}`
            }
        ],
    };
    const message: Anthropic.Message = await anthropic.messages.create(params);
    //@ts-ignore
    return message.content[0].input;
};


export const generateFAQForType = async (categoryType: string) => {
    const params: Anthropic.MessageCreateParams = {
        max_tokens: 1024,
        model: 'claude-3-opus-20240229',
        tools: [
            {
                "name": "get_faq",
                "description": "Get the FAQs for a given theme",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "faq_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "question": { "type": "string", "description": "question" },
                                    "answer": { "type": "string", "description": "answer" },
                                },
                                "required": ["question", "answer"]
                            },
                            "description": "FAQ list"
                        },

                    },
                    "required": ["faq_list"]
                }
            }
        ],
        "tool_choice": { "type": "tool", "name": "get_faq" },
        messages: [{ role: 'user', content: `Hi` }, {
            role: 'assistant',
            content: `You are assistant that copywrites for Composio. Composio make it easy to build AI agent using code, and it provides tools for agentic framework like CrewAI, langchain and works with openAI, claude and other LLM.`,
        }, {
            role: 'user',
            content: `Generate relevant 2 FAQs for ${categoryType}`
        }],
    };
    const message: Anthropic.Message = await anthropic.messages.create(params);
    //@ts-ignore
    return message.content[0].input.faq_list;

};

export const generateFAQForExample = async (example: string) => {
    const params: Anthropic.MessageCreateParams = {
        max_tokens: 1024,
        model: 'claude-3-opus-20240229',
        tools: [
            {
                "name": "get_faq",
                "description": "Get the FAQs for a given theme",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "faq_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "question": { "type": "string", "description": "question" },
                                    "answer": { "type": "string", "description": "answer" },
                                },
                                "required": ["question", "answer"]
                            },
                            "description": "FAQ list"
                        },

                    },
                    "required": ["faq_list"]
                }
            }
        ],
        "tool_choice": { "type": "tool", "name": "get_faq" },
        messages: [{ role: 'user', content: `Hi` }, {
            role: 'assistant',
            content: `You are assistant that copywrites for Composio. Composio make it easy to build AI agent using code, and it provides tools for agentic framework like CrewAI, langchain and works with openAI, claude and other LLM.`,
        }, {
            role: 'user',
            content: `Generate relevant 8 FAQs for ${example} composio and the example on more on technical aspect of building this tool.`
        }],
    };
    const message: Anthropic.Message = await anthropic.messages.create(params);
    //@ts-ignore
    return message.content[0].input.faq_list;

};