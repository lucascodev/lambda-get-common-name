import pem from 'pem';

export const getCommonName = async (pemContent) => {
    try {
        if (!pemContent) {
            throw new Error('PEM content is missing');
        }

        const certInfo = await new Promise((resolve, reject) => {
            pem.readCertificateInfo(pemContent, (err, info) => {
                if (err) {
                    reject(new Error(`Error reading PEM: ${err.message}`));
                } else {
                    resolve(info);
                }
            });
        });

        return certInfo.commonName;

    } catch (error) {
        console.error('Lambda execution error:', error); // Log do erro para depuração

        return {
            statusCode: 500, // Internal Server Error em caso de erro
            body: JSON.stringify({ error: error.message }),
        };
    }
};