import axios from 'axios';

/* Starpi API */

const commonHeaders = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 97f3d443c9f79b96058f9b72300080b4972a0d8afffd05ddea1f4336716a7c71c181865d707c12583e753869c2363e48ed6c6265c7aa2c78ccca2ddf7b538dd9429a2ce389e3548f9f14dc8c8fbde64fefa8bd03eafe5a3db7dc7bb1dcd687821320e31c31810874f278ac654956dad8257fe29f1dc09b56f65a5a93faab5758`,
    },
}
const strapiUrl =  "https://cms.composio.dev";
export async function strapi(url: string) {
    const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";
    const { data } = await axios.get(STRAPI_URL + url, commonHeaders);
    return data;
}

export const getAllTags = async () => {
    const { data: response } = await axios.get(`${strapiUrl}/api/tags?pagination[page]=1&pagination[pageSize]=10000`, commonHeaders);
    return response;
}
export const getAllTools = async () => {
    const { data: response } = await axios.get(`${strapiUrl}/api/tools?pagination[page]=1&pagination[pageSize]=10000`, commonHeaders);
    return response;
}
export const getAllPlaygroundExamples = async () => {
    const { data: response } = await axios.get(`${strapiUrl}/api/playground-examples?pagination[page]=1&pagination[pageSize]=10000`, commonHeaders);
    return response;
}

export const createOrUpdateTagForCSV = async(id: number, data: {slug:string, name: string, type: string, description: string,faq: {question: string, answer: string}[] }) => {
    const { data: response } = await axios[id ? 'put' : 'post'](`${strapiUrl}/api/tags${id ? `/${id}` : ''}`, {data}, commonHeaders);
    return response;
}

export const createOrUpdateApp = async (app:{
    name: string,
    logo: string,
    unique_id: string,
    description: string,
    tool_type: string,
    website_link: string,
    playground_config: string,
    actions: { name: string, desc: string, tag: string, unique_id: string }[],
    triggers: { name: string, unique_id: string, desc: string, tag: string }[],
    examples: { name: string, description: string, imageURL: string, unique_id: string, color: string }[],
    tags: number[],
    FAQ?: { question: string, answer: string }[],
}, id?: number) => {

    const data = {
        "name": app.name,
        "logo": app.logo,
        "unique_id": app.unique_id,
        "isPublic": true,
        "description": app.description,
        "tool_type": app.tool_type,
        "website_link": app.website_link,
        "playground_config": app.playground_config,
        "Action": app.actions,
        "Trigger": app.triggers,
        "tags": app.tags,
        "FAQ": app.FAQ,
    };

    try {
        const { data: response } = await axios[id ? 'put' : 'post'](`https://cms.composio.dev/api/tools${id ? `/${id}` : ''}`, {data}, commonHeaders);
        return response;
    } catch (error) {
       console.log(`Could not create or update app ${app.name}`, error);
        // throw error;
    }
}

export const getApp = async (uniqueId: string) => {
    const { data: response } = await axios.get(`${strapiUrl}/api/tools?filters[unique_id][$eq]=${uniqueId}`, commonHeaders);
    return response.data[0];
}

export const getTools = async () => {
    const { data: response } = await axios.get(`${strapiUrl}/api/tools?pagination[page]=1&pagination[pageSize]=10000`, commonHeaders);
    return response.data;
}

export const getToolCombo = async (uniqueId: string) => {
    const { data: response } = await axios.get(`${strapiUrl}/api/tools-combos?filters[unique_id][$eq]=${uniqueId}`, commonHeaders);
    return response.data[0];
}
export const createOrUpdateToolCombo = async (data: {unique_id: string, description: string, first_tool: number, second_tool: number},id?:number) => {
    const { data: response } = await axios[id ? 'put' : 'post'](`${strapiUrl}/api/tools-combos${id ? `/${id}` : ''}`, {data}, commonHeaders);
    return response;
}


export const findTag = async (slug: string) => {
    const { data: response } = await axios.get(`${strapiUrl}/api/tags?filters[slug][$eq]=${slug}`, commonHeaders);
    return response.data[0];
}

export const createOrUpdateTag = async (data: {slug:string, name: string, type: string, description: string,faq: {question: string, answer: string}[] },id?:number) => {
    const { data: response } = await axios[id ? 'put' : 'post'](`${strapiUrl}/api/tags${id ? `/${id}` : ''}`, { data }, commonHeaders);
    return response;
}

export const createOrUpdatePlaygroundExample = async (data: {
    name: string,
    description: string,
    config_url: string,
    imageURL: string,
    unique_id: string,
    faq: {question: string, answer: string}[],
    color: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'pink' | 'teal' | 'gray',
}, id?: number) => {
    const { data: response } = await axios[id ? 'put' : 'post'](`${strapiUrl}/api/playground-examples${id ? `/${id}` : ''}`, {data}, commonHeaders);
    return response;
}


export const getPlaygroundExample = async (uniqueId: string) => {
    const { data: response } = await axios.get(`${strapiUrl}/api/playground-examples?filters[unique_id][$eq]=${uniqueId}`, commonHeaders);
    return response.data[0];
}


export const getPlaygroundExampleByID = async (id: number) => {
    const { data: response } = await axios.get(`${strapiUrl}/api/playground-examples?filters[id][$eq]=${id}`, commonHeaders);
    return response.data[0];
}

