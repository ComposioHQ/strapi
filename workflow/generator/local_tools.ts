import { createOrUpdateApp, getApp } from '../strapi';
import { getActionsNTriggers, getToolDescription } from '../claude';

const generateUniqueId = (app: string) => {
    return app.toLowerCase().replace(/\s/g, "_");
};

const commerceApps = [
    "CodeIndex", "CodeFormat", "CodeGrep", "CodeMap", "Embed",
    "Mathematical", "File", "Greptile", "Rag", "FileEdit",
    "Search", "GitCmd", "HistoryFetcher", "ShellExec", "Spider",
    "Sql", "Web", "Zep"
];

const actions = [
    "CODEFORMAT_FORMAT_AND_LINT_CODEBASE",
    "CODEGREP_SEARCH_CODEBASE",
    "CODEINDEX_CREATE_INDEX",
    "CODEINDEX_INDEX_STATUS",
    "CODEINDEX_SEARCH_CODEBASE",
    "CODEMAP_DELETE_REPO_MAP",
    "CODEMAP_GENERATE_RANKED_TAGS",
    "CODEMAP_GET_REPO_MAP",
    "CODEMAP_INIT_REPO_MAP",
    "EMBEDTOOL_CREATE_IMAGE_VECTOR_STORE",
    "EMBEDTOOL_QUERY_IMAGE_VECTOR_STORE",
    "FILEEDITTOOL_CREATE_FILE_CMD",
    "FILEEDITTOOL_EDIT_FILE",
    "FILEEDITTOOL_OPEN_FILE",
    "FILEEDITTOOL_SCROLL",
    "FILETOOL_READ_FILE",
    "FILETOOL_WRITE_FILE",
    "GITCMDTOOL_GET_PATCH_CMD",
    "GITCMDTOOL_GITHUB_CLONE_CMD",
    "GITCMDTOOL_GIT_REPO_TREE",
    "GREPTILE_CODE_QUERY",
    "HISTORYFETCHERTOOL_GET_WORKSPACE_HISTORY",
    "MATHEMATICAL_CALCULATOR",
    "RAGTOOL_ADD_CONTENT_TO_RAG_TOOL",
    "RAGTOOL_RAG_TOOL_QUERY",
    "SEARCHTOOL_FIND_FILE_CMD",
    "SEARCHTOOL_SEARCH_DIR_CMD",
    "SEARCHTOOL_SEARCH_FILE_CMD",
    "SHELL_CREATE_SHELL",
    "SHELL_EXEC_COMMAND",
    "SPIDERTOOL_CRAWL",
    "SPIDERTOOL_SCRAPE",
    "SQLTOOL_SQL_QUERY",
    "WEBTOOL_SCRAPE_WEBSITE_CONTENT",
    "WEBTOOL_SCRAPE_WEBSITE_ELEMENT",
    "ZEPTOOL_ADD_MEMORY",
    "ZEPTOOL_CREATE_SESSION",
    "ZEPTOOL_GET_MEMORY",
    "ZEPTOOL_SEARCH_MEMORY"
];

const findAction = (tool: string) => {
    return actions.filter(action => action.toLowerCase().includes(tool.toLowerCase())) || '';
};

const TOOLS_TO_CREATE = commerceApps.map((app) => ({
    key: generateUniqueId(app),
    name: app,
    logo: null,
    website_link: null,
    actions: findAction(app).map((actionName) => ({
        name: actionName,
        desc: "",
        tag: "",
        unique_id: actionName
    })),
    description: null
}));

async function main() {
    // console.log(JSON.stringify(TOOLS_TO_CREATE, null, 2));
    for (const tool of TOOLS_TO_CREATE) {
        await createNewTool(tool);
    }
}

async function createNewTool(app: any) {
  

    const strapiApp = await getApp(app.key);
    if (strapiApp?.id) {
        console.log("App already exists", app.key);
        return;
    }



    await createOrUpdateApp({
        name: app.name,
        logo: app.logo || "",
        unique_id: app.key,
        description: "",
        tool_type: 'local',
        website_link: "",
        playground_config: "",
        actions: [],
        triggers: [],
        examples: [],
        tags: [59],
        FAQ: [],
        //@ts-ignore
        actions: app.actions,
        //@ts-ignore
        triggers: [],
    });

    console.log("App created/updated", app.key);
}

main();

// type ActionOrTrigger = {
//     name: string;
//     desc: string;
//     tag: string;
//     unique_id: string;
// };