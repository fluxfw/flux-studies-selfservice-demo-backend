import CERTIFICATE_TYPES from "../CertificateType/certificate-types.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/CertificateType/CertificateType.mjs").CertificateType} CertificateType */

export class GetCertificateTypesCommand {
    /**
     * @returns {GetCertificateTypesCommand}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @returns {Promise<CertificateType[]>}
     */
    async getCertificateTypes() {
        return structuredClone(CERTIFICATE_TYPES);
    }
}
