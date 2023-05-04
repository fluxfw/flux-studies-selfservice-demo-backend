import { BIRTH_DATE_FORMAT } from "../PersonalData/BIRTH_DATE_FORMAT.mjs";
import { EMAIL_FORMAT } from "../PersonalData/EMAIL_FORMAT.mjs";
import { MAX_BIRTH_DATE } from "../PersonalData/MAX_BIRTH_DATE.mjs";
import { MIN_BIRTH_DATE } from "../PersonalData/MIN_BIRTH_DATE.mjs";
import { PHONE_TYPES } from "../../../../flux-studis-selfservice-frontend/src/PersonalData/PHONE_TYPES.mjs";
import { regExpStringToRegExp } from "../../../../flux-studis-selfservice-frontend/src/PersonalData/regExpStringToRegExp.mjs";
import { PAGE_LEGAL, PAGE_PERSONAL_DATA } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PersonalData/FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class FilledPersonalDataCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {FilledPersonalDataCommand}
     */
    static new(data_service) {
        return new this(
            data_service
        );
    }

    /**
     * @param {DataService} data_service
     * @private
     */
    constructor(data_service) {
        this.#data_service = data_service;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: FilledPersonalData}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async filledPersonalData(application, post) {
        if (application.page !== PAGE_PERSONAL_DATA || post.page !== application.page) {
            return false;
        }

        if (post.data === null || typeof post.data !== "object") {
            return false;
        }

        const personal_data = await this.#data_service.getPersonalData();

        if (typeof post.data.salutation !== "string") {
            return false;
        }
        if (post.data.salutation === "") {
            return false;
        }
        if (!personal_data.salutations.some(salutation => salutation.id === post.data.salutation)) {
            return false;
        }

        if (typeof post.data["first-name"] !== "string") {
            return false;
        }
        if (post.data["first-name"] === "") {
            return false;
        }

        if (typeof post.data["second-first-name"] !== "string") {
            return false;
        }

        if (!Array.isArray(post.data["additional-first-names"])) {
            return false;
        }
        if (!post.data["additional-first-names"].every(name => typeof name === "string" && name !== "")) {
            return false;
        }

        if (typeof post.data["last-name"] !== "string") {
            return false;
        }
        if (post.data["last-name"] === "") {
            return false;
        }

        if (typeof post.data["registration-number"] !== "string") {
            return false;
        }
        if (post.data["registration-number"] !== "" && !regExpStringToRegExp(
            personal_data["registration-number-format"]
        ).test(post.data["registration-number"])) {
            return false;
        }

        if (typeof post.data.country !== "string") {
            return false;
        }
        if (post.data.country === "") {
            return false;
        }
        if (!personal_data.countries.some(country => country.id === post.data.country)) {
            return false;
        }

        if (typeof post.data["extra-address-line"] !== "string") {
            return false;
        }

        if (typeof post.data.street !== "string") {
            return false;
        }
        if (post.data.street === "") {
            return false;
        }

        if (!Number.isInteger(post.data["house-number"])) {
            return false;
        }
        if (post.data["house-number"] < personal_data["min-house-number"]) {
            return false;
        }
        if (post.data["house-number"] > personal_data["max-house-number"]) {
            return false;
        }

        if (typeof post.data["postal-office-box"] !== "string") {
            return false;
        }

        if (!Number.isInteger(post.data["postal-code"])) {
            return false;
        }
        if (post.data["postal-code"] < personal_data["min-postal-code"]) {
            return false;
        }
        if (post.data["postal-code"] > personal_data["max-postal-code"]) {
            return false;
        }

        if (typeof post.data.place !== "string") {
            return false;
        }
        if (post.data.place === "") {
            return false;
        }
        const place = personal_data.places.find(_place => _place.id === post.data.place) ?? null;
        if (place === null) {
            return false;
        }
        if (place["postal-code"] !== post.data["postal-code"]) {
            return false;
        }

        for (const phone_type of PHONE_TYPES) {
            if (typeof post.data[`${phone_type}-phone-area-code`] !== "string") {
                return false;
            }
            if (personal_data[`required-phone-${phone_type}`] && post.data[`${phone_type}-phone-area-code`] === "") {
                return false;
            }
            if (post.data[`${phone_type}-phone-area-code`] === "" && post.data[`${phone_type}-phone-number`] !== "") {
                return false;
            }

            if (typeof post.data[`${phone_type}-phone-number`] !== "string") {
                return false;
            }
            if (personal_data[`required-phone-${phone_type}`] && post.data[`${phone_type}-phone-number`] === "") {
                return false;
            }
            if (post.data[`${phone_type}-phone-area-code`] !== "" && post.data[`${phone_type}-phone-number`] === "") {
                return false;
            }

            const area_code = post.data[`${phone_type}-phone-area-code`] !== "" ? personal_data["area-codes"].find(_area_code => _area_code.id === post.data[`${phone_type}-phone-area-code`]) ?? null : null;
            if (post.data[`${phone_type}-phone-area-code`] !== "" && area_code === null) {
                return false;
            }
            if (post.data[`${phone_type}-phone-number`] !== "" && !regExpStringToRegExp(
                area_code["phone-number-format"]
            ).test(post.data[`${phone_type}-phone-number`])) {
                return false;
            }
        }

        if (personal_data["required-phone"]) {
            if (!PHONE_TYPES.some(phone_type => post.data[`${phone_type}-phone-area-code`] !== "")) {
                return false;
            }
        }

        if (personal_data["only-one-phone"]) {
            if (PHONE_TYPES.filter(phone_type => post.data[`${phone_type}-phone-area-code`] !== "").length > 1) {
                return false;
            }
        }

        if (typeof post.data.email !== "string") {
            return false;
        }
        if (personal_data["required-email"] && post.data.email === "") {
            return false;
        }
        if (post.data.email !== "" && !EMAIL_FORMAT.test(post.data.email)) {
            return false;
        }

        if (typeof post.data["mother-language"] !== "string") {
            return false;
        }
        if (post.data["mother-language"] === "") {
            return false;
        }
        if (!personal_data["mother-languages"].some(mother_language => mother_language.id === post.data["mother-language"])) {
            return false;
        }

        if (typeof post.data["correspondence-language"] !== "string") {
            return false;
        }
        if (post.data["correspondence-language"] === "") {
            return false;
        }
        if (!personal_data["correspondence-languages"].some(correspondence_language => correspondence_language.id === post.data["correspondence-language"])) {
            return false;
        }

        if (typeof post.data["birth-date"] !== "string") {
            return false;
        }
        if (post.data["birth-date"] === "") {
            return false;
        }
        if (!BIRTH_DATE_FORMAT.test(post.data["birth-date"])) {
            return false;
        }
        if (post.data["birth-date"] < MIN_BIRTH_DATE) {
            return false;
        }
        if (post.data["birth-date"] > MAX_BIRTH_DATE) {
            return false;
        }

        if (typeof post.data["old-age-survivar-insurance-number"] !== "string") {
            return false;
        }
        if (post.data["old-age-survivar-insurance-number"] !== "" && !regExpStringToRegExp(
            personal_data["old-age-survivar-insurance-number-format"]
        ).test(post.data["old-age-survivar-insurance-number"])) {
            return false;
        }

        if (typeof post.data.nationally !== "string") {
            return false;
        }
        if (post.data.nationally === "") {
            return false;
        }
        if (!personal_data.nationalities.some(nationally => nationally.id === post.data.nationally)) {
            return false;
        }

        if (typeof post.data["origin-place"] !== "string") {
            return false;
        }
        if (post.data["origin-place"] === "") {
            return false;
        }
        if (!personal_data["origin-places"].some(origin_place => origin_place.id === post.data["origin-place"])) {
            return false;
        }

        if (typeof post.data["parents-address"] !== "boolean") {
            return false;
        }

        if (post.data["parents-address"]) {
            if (typeof post.data["parents-address-salutation"] !== "string") {
                return false;
            }
            if (post.data["parents-address-salutation"] === "") {
                return false;
            }
            if (!personal_data.salutations.some(salutation => salutation.id === post.data["parents-address-salutation"])) {
                return false;
            }

            if (!Array.isArray(post.data["parents-address-first-names"])) {
                return false;
            }
            if (post.data["parents-address-first-names"].length === 0) {
                return false;
            }
            if (!post.data["parents-address-first-names"].every(name => typeof name === "string" && name !== "")) {
                return false;
            }

            if (typeof post.data["parents-address-last-name"] !== "string") {
                return false;
            }
            if (post.data["parents-address-last-name"] === "") {
                return false;
            }

            if (typeof post.data["parents-address-same-address"] !== "boolean") {
                return false;
            }

            if (!post.data["parents-address-same-address"]) {
                if (typeof post.data["parents-address-country"] !== "string") {
                    return false;
                }
                if (post.data["parents-address-country"] === "") {
                    return false;
                }
                if (!personal_data.countries.some(country => country.id === post.data["parents-address-country"])) {
                    return false;
                }

                if (typeof post.data["parents-address-extra-address-line"] !== "string") {
                    return false;
                }

                if (typeof post.data["parents-address-street"] !== "string") {
                    return false;
                }
                if (post.data["parents-address-street"] === "") {
                    return false;
                }

                if (!Number.isInteger(post.data["parents-address-house-number"])) {
                    return false;
                }
                if (post.data["parents-address-house-number"] < personal_data["min-house-number"]) {
                    return false;
                }
                if (post.data["parents-address-house-number"] > personal_data["max-house-number"]) {
                    return false;
                }

                if (!Number.isInteger(post.data["parents-address-postal-code"])) {
                    return false;
                }
                if (post.data["parents-address-postal-code"] < personal_data["min-postal-code"]) {
                    return false;
                }
                if (post.data["parents-address-postal-code"] > personal_data["max-postal-code"]) {
                    return false;
                }

                if (typeof post.data["parents-address-place"] !== "string") {
                    return false;
                }
                if (post.data["parents-address-place"] === "") {
                    return false;
                }
                const parents_address_place = personal_data.places.find(_place => _place.id === post.data["parents-address-place"]) ?? null;
                if (parents_address_place === null) {
                    return false;
                }
                if (parents_address_place["postal-code"] !== post.data["parents-address-postal-code"]) {
                    return false;
                }
            } else {
                if (post.data["parents-address-country"] !== null) {
                    return false;
                }

                if (post.data["parents-address-extra-address-line"] !== null) {
                    return false;
                }

                if (post.data["parents-address-street"] !== null) {
                    return false;
                }

                if (post.data["parents-address-house-number"] !== null) {
                    return false;
                }

                if (post.data["parents-address-postal-code"] !== null) {
                    return false;
                }

                if (post.data["parents-address-place"] !== null) {
                    return false;
                }
            }

            if (typeof post.data["parents-address-general-post"] !== "boolean") {
                return false;
            }

            if (typeof post.data["parents-address-invoices"] !== "boolean") {
                return false;
            }
        } else {
            if (post.data["parents-address-salutation"] !== null) {
                return false;
            }

            if (post.data["parents-address-first-names"] !== null) {
                return false;
            }

            if (post.data["parents-address-last-name"] !== null) {
                return false;
            }

            if (post.data["parents-address-same-address"] !== null) {
                return false;
            }

            if (post.data["parents-address-country"] !== null) {
                return false;
            }

            if (post.data["parents-address-extra-address-line"] !== null) {
                return false;
            }

            if (post.data["parents-address-street"] !== null) {
                return false;
            }

            if (post.data["parents-address-house-number"] !== null) {
                return false;
            }

            if (post.data["parents-address-postal-code"] !== null) {
                return false;
            }

            if (post.data["parents-address-place"] !== null) {
                return false;
            }

            if (post.data["parents-address-general-post"] !== null) {
                return false;
            }

            if (post.data["parents-address-invoices"] !== null) {
                return false;
            }
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = PAGE_LEGAL;

        return true;
    }
}
