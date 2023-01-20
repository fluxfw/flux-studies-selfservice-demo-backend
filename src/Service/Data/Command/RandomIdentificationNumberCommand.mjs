export class RandomIdentificationNumberCommand {
    /**
     * @returns {RandomIdentificationNumberCommand}
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
     * @returns {Promise<string>}
     */
    async randomIdentificationNumber() {
        return Math.random().toString(36).substring(2, 12);
    }
}
