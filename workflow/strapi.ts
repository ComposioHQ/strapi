import axios from 'axios';

/* Starpi API */

const commonHeaders = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer d12b4692cff05d0912408c2fc490210fbfa5ec29a8892d339cde3d2560938df7f48c4a714e8f97a00f358f9abeeaec2489c84691b8c049705d7a37a3cad331476ba35ba3743b83a793174313d6e45d36464d97ac96389596892ab207228277e7d90d703d75013e4f7079277598964efb583da24c82345a83b69d92e4a7eba81e`,
    },
}
export async function strapi(url: string) {
    const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";
    const { data } = await axios.get(STRAPI_URL + url, commonHeaders);

    return data;
}



export const addApp = async (app:{
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
    FAQ: { question: string, answer: string }[],
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
    const { data: response } = await axios[id ? 'put' : 'post'](`http://127.0.0.1:1337/api/tools${id ? `/${id}` : ''}`, {data}, commonHeaders);
    return response;
}

export const getApp = async (uniqueId: string) => {
    const { data: response } = await axios.get(`http://127.0.0.1:1337/api/tools?filters[unique_id][$eq]=${uniqueId}`, commonHeaders);
    return response.data[0];
}
