import {getCommonName} from "./functions/index.mjs";


export const handler = async (event, context) => {
    try {
        const commonName = await getCommonName(event.contentPem);

        return { statusCode: 200, body: JSON.stringify({ commonName }) };
    } catch (error) {
        console.error('Lambda execution error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
