import axios from 'axios';

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: "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", // This is the default and can be omitted
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
  const data = JSON.stringify({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1024,
    // response_format: { type: "json_object" },
    // tools: [
    //   {
    //     name: 'get_faq',
    //     description: 'Get the FAQs for a given tool',
    //     input_schema: {
    //         "type": "object",
    //         "properties": {
    //             "toolsName": {
    //                 "type": "string",
    //                 "description": "The name of the tool"
    //             }
    //         },
    //         "required": ["toolsName"]
    //     },
    //     output_schema: {
    //         "type": "object",
    //         "properties": {
    //             "faq": {
    //                 "type": "array",
    //                 "items": {
    //                     "type": "object",
    //                     "properties": {
    //                         "question": {
    //                             "type": "string",
    //                             "description": "The question text"
    //                         },
    //                         "answer": {
    //                             "type": "string",
    //                             "description": "The answer text"
    //                         }
    //                     },
    //                     "required": ["question", "answer"]
    //                 }
    //             }
    //         },
    //         "required": ["faq"]
    //     },
    //   },
    // ],
    messages: [
    //   {
    //     role: 'system',
    //     content: `You are a helpful assistant that can generate FAQ for a given tool. `,
    //   },
      {
        role: 'user',
        content: `Generate 2 FAQ for ${toolsName}`,
      },
        {
            "role": "assistant",
            "content": "Here is the JSON requested:\n{"
        }
    ],
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.anthropic.com/v1/messages',
    headers: {
      'content-type': 'application/json',
      'x-api-key': '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',
      'anthropic-version': '2023-06-01',
    },
    data,
  };

  try {
    const response = await axios.request(config);
    const data = response.data.content
    // return data;
      const faq = data[0].text.split('\n').slice(1, -1).join('\n');
   return faq;
    //  return JSON.parse(faq);
  } catch (error) {
    // @ts-ignore
    console.log(error);
  }
};
