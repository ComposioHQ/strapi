import { createOrUpdateApp, getApp } from '../strapi';
import { getActionsNTriggers, getToolDescription } from '../claude';

// Generate a unique ID for an app by converting its name to lowercase and replacing spaces with underscores
const generateUniqueId = (app: string): string => app.toLowerCase().replace(/\s/g, "_");

// List of local tools to be created
const localTools = [
    "CodeIndex", "CodeFormat", "CodeGrep", "CodeMap", "Embed",
    "Mathematical", "File", "Greptile", "Rag", "FileEdit",
    "Search", "GitCmd", "HistoryFetcher", "ShellExec", "Spider",
    "Sql", "Web", "Zep"
];

// List of all available actions for the tools
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

// Find actions for a specific tool
const findAction = (tool: string): string[] => {
    return actions.filter(action => action.toLowerCase().includes(tool.toLowerCase())) || [];
};

// Prepare the tools to be created
const TOOLS_TO_CREATE = localTools.map((app) => ({
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

// Main function to create all tools
async function main() {
    for (const tool of TOOLS_TO_CREATE) {
        await createNewTool(tool);
    }
}

// Function to create a new tool or update if it already exists
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
        actions: app.actions,
        triggers: [],
        examples: [],
        tags: [59],
        FAQ: [],
    });

    console.log("App created/updated", app.key);
}

main();
