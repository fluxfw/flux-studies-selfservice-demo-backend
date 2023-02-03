export class RandomSessionNumberCommand {
    /**
     * @returns {RandomSessionNumberCommand}
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
    async randomSessionNumber() {
        return crypto.randomUUID();
    }
}
