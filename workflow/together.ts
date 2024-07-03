import OpenAI from 'openai';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Defining the Together.ai client
const togetherai = new OpenAI({
    apiKey: "9501a4bea280cfea26936bc1a9011c990be525a6bc01c6f0256719f88d922618",
    baseURL: 'https://api.together.xyz/v1',
});

// Defining the schema we want our data in
const actionItemsSchema = z.object({
    use_case: z
        .array(z.string())
        .describe('list of uses case for give task'),
});
const jsonSchema = zodToJsonSchema(actionItemsSchema, 'mySchema');

async function main() {
    const transcript = ' AI builder, I want to create a list of all popular examples of AI use cases. Only list titles of use cases.';
    const extract = await togetherai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    ' You\'re SEO expert. List examples of use cases for email using LLM models. Like email editor, email automation. List 100 use cas',
            },
            {
                role: 'user',
                content: transcript,
            },
        ],
        model: 'mistralai/Mistral-7B-Instruct-v0.1',
        // @ts-ignore – Together.ai supports schema while OpenAI does not
        response_format: { type: 'json_object', schema: jsonSchema },
    });

    const output = JSON.parse(extract.choices[0].message.content!);
    console.log({ output });
    return output;
}

main();