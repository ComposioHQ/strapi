
## To install ts-node, follow these steps:
```npm install -g ts-node```

```yarn add```

## To create new tools, follow these steps:
1. `cd generator` 
2. Update `TOOLS_TO_CREATE` with your content in `create_new_tools.ts`
3. `STRAPI_URL=https://cms.composio.dev STRAPI_TOKEN=<token> ANTHROPIC_API_KEY=<token> ts-node create_new_tools.ts`


## To create new playground examples, follow these steps:
1. `cd generator` 
2. Update `PLAYGROUND_EXAMPLES` with your content in `create_playground_example.ts`
3. `STRAPI_URL=https://cms.composio.dev STRAPI_TOKEN=<token> ANTHROPIC_API_KEY=<token> ts-node create_playground_example.ts`


## To create new tags, follow these steps:
1. `cd generator` 
2. Update `TAGS_TO_CREATE` with your content in `create_tags.ts`
3. `STRAPI_URL=https://cms.composio.dev STRAPI_TOKEN=<token> ANTHROPIC_API_KEY=<token> ts-node create_tags.ts`


## Content can also be changed via GUI
- cms.composio.dev