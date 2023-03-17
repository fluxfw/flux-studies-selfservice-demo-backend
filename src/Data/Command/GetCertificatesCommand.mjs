import CERTIFICATES from "../Certificate/certificates.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Certificate/Certificate.mjs").Certificate} Certificate */

export class GetCertificatesCommand {
    /**
     * @returns {GetCertificatesCommand}
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
     * @returns {Promise<Certificate[]>}
     */
    async getCertificates() {
        return structuredClone(CERTIFICATES);
    }
}
