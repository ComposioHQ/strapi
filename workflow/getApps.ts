import axios from 'axios';

const API_KEY = process.env.COMPOSIO_API_KEY
/* Backend API */
export const getAppsFromBE = () => {
    return axios.get('https://backend.composio.dev/api/v1/apps/?page=1', {
        headers: {
            'x-api-key': API_KEY
        }
    }).then(response => response.data);
};
export const getAppFromBE = (uniqueId:string) => {
    return axios.get(`https://backend.composio.dev/api/v1/apps/${uniqueId}`, {
        headers: {
            'x-api-key': API_KEY
        }
    }).then(response => response.data);
};

export const getActionsFromBE = (appNames: string, page: number = 1) => {
    return axios.get(`https://backend.composio.dev/api/v1/actions?appNames=${appNames}&page=${page}`, {
        headers: {
            'x-api-key': API_KEY
        }
    }).then(response => response.data);
};


export const getTriggersFromBE = (appNames: string, page: number = 1) => {
    return axios.get(`https://backend.composio.dev/api/v1/triggers?appNames=${appNames}&page=${page}`, {
        headers: {
            'x-api-key': API_KEY
        }
    }).then(response => response.data);
};

