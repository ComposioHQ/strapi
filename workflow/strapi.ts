import axios from 'axios';

/* Starpi API */

const commonHeaders = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
}
const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
export async function strapi(url: string) {
    const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";
    const { data } = await axios.get(STRAPI_URL + url, commonHeaders);
    return data;
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
    tags: { slug: string, type: string, description: string }[],
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
        "tags": [],
        "FAQ": app.FAQ,
    };
    try {
        const { data: response } = await axios[id ? 'put' : 'post'](`https://cms.composio.dev/api/tools${id ? `/${id}` : ''}`, {data}, commonHeaders);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getApp = async (uniqueId: string) => {
    const { data: response } = await axios.get(`${strapiUrl}/api/tools?filters[unique_id][$eq]=${uniqueId}`, commonHeaders);
    return response.data[0];
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
    color: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'pink' | 'teal' | 'gray',
}, id?: number) => {
    const { data: response } = await axios[id ? 'put' : 'post'](`${strapiUrl}/api/playground-examples${id ? `/${id}` : ''}`, {data}, commonHeaders);
    return response;
}


export const getPlaygroundExample = async (uniqueId: string) => {
    const { data: response } = await axios.get(`${strapiUrl}/api/playground-examples?filters[unique_id][$eq]=${uniqueId}`, commonHeaders);
    return response.data[0];
}

