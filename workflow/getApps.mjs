import axios from 'axios';

/* Backend API */
export const getApps = () => {
    return axios.get('https://backend.composio.dev/api/v1/apps/?page=1', {
        headers: {
            'x-api-key': `cc0fu8lookgq1ov8z4xx9n`
        }
    }).then(response => response.data);
};
const getApp = (uniqueId) => {
    return axios.get(`https://backend.composio.dev/api/v1/apps/${url}/`, {
        headers: {
            'x-api-key': `cc0fu8lookgq1ov8z4xx9n`
        }
    }).then(response => response.data);
};
