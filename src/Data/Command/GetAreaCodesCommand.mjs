import AREA_CODES from "../AreaCode/area-codes.json" assert {type: "json"};
import { PHONE_NUMBER_EXAMPLE, PHONE_NUMBER_FORMAT } from "../PersonalData/PHONE_NUMBER.mjs";

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/AreaCode/AreaCode.mjs").AreaCode} AreaCode */

export class GetAreaCodesCommand {
    /**
     * @returns {GetAreaCodesCommand}
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
     * @returns {Promise<AreaCode[]>}
     */
    async getAreaCodes() {
        return structuredClone(AREA_CODES.map(area_code => {
            const _area_code = structuredClone(area_code);
            _area_code["phone-number-format"] = `${PHONE_NUMBER_FORMAT}`;
            _area_code["phone-number-example"] = PHONE_NUMBER_EXAMPLE;
            return _area_code;
        }));
    }
}
