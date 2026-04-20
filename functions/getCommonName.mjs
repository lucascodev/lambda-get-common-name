import pem from "pem";

export const getCommonName = async (pemContent) => {
  if (!pemContent) {
    throw new Error("PEM content is missing");
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
};
