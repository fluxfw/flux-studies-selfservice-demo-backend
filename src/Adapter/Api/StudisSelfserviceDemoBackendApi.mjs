import { BIRTH_DATE_FORMAT } from "../Data/PersonalData/BIRTH_DATE_FORMAT.mjs";
import { CONFIG_ENV_PREFIX } from "../Config/CONFIG.mjs";
import { COOKIE_IDENTIFICATION_NUMBER } from "../Response/COOKIE.mjs";
import cookieParser from "cookie-parser";
import { EMAIL_FORMAT } from "../Data/PersonalData/EMAIL_FORMAT.mjs";
import express from "express";
import { fileURLToPath } from "node:url";
import { MAX_BIRTH_DATE } from "../Data/PersonalData/MAX_BIRTH_DATE.mjs";
import { MAX_END_DATE } from "../Data/PreviousStudies/MAX_END_DATE.mjs";
import { MAX_ISSUE_DATE } from "../Data/UniversityEntranceQualification/MAX_ISSUE_DATE.mjs";
import { MAX_START_DATE } from "../Data/PreviousStudies/MAX_START_DATE.mjs";
import { MIN_BIRTH_DATE } from "../Data/PersonalData/MIN_BIRTH_DATE.mjs";
import { MIN_END_DATE } from "../Data/PreviousStudies/MIN_END_DATE.mjs";
import { MIN_ISSUE_DATE } from "../Data/UniversityEntranceQualification/MIN_ISSUE_DATE.mjs";
import { MIN_START_DATE } from "../Data/PreviousStudies/MIN_START_DATE.mjs";
import { OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT } from "../Data/PersonalData/OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT.mjs";
import { PHONE_NUMBER_FORMAT } from "../Data/PersonalData/PHONE_NUMBER_FORMAT.mjs";
import { REGISTRATION_NUMBER_FORMAT } from "../Data/PersonalData/REGISTRATION_NUMBER_FORMAT.mjs";
import { dirname, join } from "node:path/posix";
import { EXPRESS_SERVER_DEFAULT_LISTEN_HTTP_PORT, EXPRESS_SERVER_DEFAULT_LISTEN_HTTPS_PORT, EXPRESS_SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS, EXPRESS_SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT, EXPRESS_SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE } from "../../../../flux-express-server-api/src/Adapter/ExpressServer/EXPRESS_SERVER.mjs";
import { PAGE_CHOICE_SUBJECT, PAGE_COMPLETED, PAGE_CREATE, PAGE_IDENTIFICATION_NUMBER, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL, PAGE_PERSONAL_DATA, PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_RESUME, PAGE_START, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../flux-studis-selfservice-frontend/src/Adapter/Page/PAGE.mjs";
import { SERVER_CONFIG_HTTPS_CERT_KEY, SERVER_CONFIG_HTTPS_DHPARAM_KEY, SERVER_CONFIG_HTTPS_KEY_KEY, SERVER_CONFIG_LISTEN_HTTP_PORT_KEY, SERVER_CONFIG_LISTEN_HTTPS_PORT_KEY, SERVER_CONFIG_LISTEN_INTERFACE_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_PORT_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE_KEY } from "../Server/SERVER_CONFIG.mjs";

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Legal/AcceptedLegal.mjs").AcceptedLegal} AcceptedLegal */
/** @typedef {import("../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/AreaCode/AreaCode.mjs").AreaCode} AreaCode */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Canton/Canton.mjs").Canton} Canton */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Certificate/Certificate.mjs").Certificate} Certificate */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/CertificateType/CertificateType.mjs").CertificateType} CertificateType */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../../flux-config-api/src/Adapter/Api/ConfigApi.mjs").ConfigApi} ConfigApi */
/** @typedef {import("../../../../flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs").ExpressServerApi} ExpressServerApi */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/IntendedDegreeProgram2/ChosenIntendedDegreeProgram2.mjs").ChosenIntendedDegreeProgram2} ChosenIntendedDegreeProgram2 */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Portrait/ChosenPortrait.mjs").ChosenPortrait} ChosenPortrait */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/PreviousStudies/ChosenPreviousStudies.mjs").ChosenPreviousStudies} ChosenPreviousStudies */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/IdentificationNumber/ConfirmedIdentificationNumber.mjs").ConfirmedIdentificationNumber} ConfirmedIdentificationNumber */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Country/Country.mjs").Country} Country */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Create/Create.mjs").Create} Create */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/DegreeTitle/DegreeTitle.mjs").DegreeTitle} DegreeTitle */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/PersonalData/FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/IdentificationNumber/IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/IntendedDegreeProgram/IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/IntendedDegreeProgram2/IntendedDegreeProgram2.mjs").IntendedDegreeProgram2} IntendedDegreeProgram2 */
/** @typedef {import("../../../../flux-json-api/src/Adapter/Api/JsonApi.mjs").JsonApi} JsonApi */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Language/Language.mjs").Language} Language */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Layout/Layout.mjs").Layout} Layout */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Legal/Legal.mjs").Legal} Legal */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/PersonalData/PersonalData.mjs").PersonalData} PersonalData */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Place/Place.mjs").Place} Place */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Portrait/Portrait.mjs").Portrait} Portrait */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/PreviousStudies/PreviousStudies.mjs").PreviousStudies} PreviousStudies */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */
/** @typedef {import("../Response/Response.mjs").Response} Response */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Resume/Resume.mjs").Resume} Resume */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Salutation/Salutation.mjs").Salutation} Salutation */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/School/School.mjs").School} School */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Semester/Semester.mjs").Semester} Semester */
/** @typedef {import("../../../../flux-shutdown-handler-api/src/Adapter/ShutdownHandler/ShutdownHandler.mjs").ShutdownHandler} ShutdownHandler */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Start/Start.mjs").Start} Start */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/Subject/SubjectWithCombinations.mjs").SubjectWithCombinations} SubjectWithCombinations */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Adapter/UniversityEntranceQualification/UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */

const __dirname = dirname(fileURLToPath(import.meta.url));

export class StudisSelfserviceDemoBackendApi {
    /**
     * @type {Application[]}}
     */
    #applications;
    /**
     * @type {ConfigApi | null}
     */
    #config_api = null;
    /**
     * @type {ExpressServerApi | null}
     */
    #express_server_api = null;
    /**
     * @type {JsonApi | null}
     */
    #json_api = null;
    /**
     * @type {ShutdownHandler}
     */
    #shutdown_handler;

    /**
     * @param {ShutdownHandler} shutdown_handler
     * @returns {StudisSelfserviceDemoBackendApi}
     */
    static new(shutdown_handler) {
        return new this(
            shutdown_handler
        );
    }

    /**
     * @param {ShutdownHandler} shutdown_handler
     * @private
     */
    constructor(shutdown_handler) {
        this.#shutdown_handler = shutdown_handler;
        this.#applications = [];
    }

    /**
     * @returns {Promise<void>}
     */
    async runServer() {
        const config_api = await this.#getConfigApi();

        await (await this.#getExpressServerApi()).runExpressServer(
            async () => this.#getRouter(),
            {
                https_cert: await config_api.getConfig(
                    SERVER_CONFIG_HTTPS_CERT_KEY
                ),
                https_dhparam: await config_api.getConfig(
                    SERVER_CONFIG_HTTPS_DHPARAM_KEY
                ),
                https_key: await config_api.getConfig(
                    SERVER_CONFIG_HTTPS_KEY_KEY
                ),
                listen_http_port: await config_api.getConfig(
                    SERVER_CONFIG_LISTEN_HTTP_PORT_KEY,
                    EXPRESS_SERVER_DEFAULT_LISTEN_HTTP_PORT
                ),
                listen_https_port: await config_api.getConfig(
                    SERVER_CONFIG_LISTEN_HTTPS_PORT_KEY,
                    EXPRESS_SERVER_DEFAULT_LISTEN_HTTPS_PORT
                ),
                listen_interface: await config_api.getConfig(
                    SERVER_CONFIG_LISTEN_INTERFACE_KEY
                ),
                redirect_http_to_https: await config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_KEY,
                    EXPRESS_SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS
                ),
                redirect_http_to_https_port: await config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_PORT_KEY,
                    EXPRESS_SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT
                ),
                redirect_http_to_https_status_code: await config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE_KEY,
                    EXPRESS_SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE
                )
            }
        );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: AcceptedLegal}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #acceptedLegal(application, post) {
        if (application.page !== PAGE_LEGAL || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const legal = await this.#getLegal(
            this.#getPost(
                application,
                PAGE_CHOICE_SUBJECT
            ).data,
            this.#getPost(
                application,
                PAGE_INTENDED_DEGREE_PROGRAM
            ).data,
            this.#getPost(
                application,
                PAGE_INTENDED_DEGREE_PROGRAM_2
            ).data
        );

        if (typeof post.data["not-disqualified"] !== "boolean") {
            return false;
        }
        if (!post.data["not-disqualified"]) {
            return false;
        }

        if (typeof post.data.agb !== "boolean") {
            return false;
        }
        if (!post.data.agb) {
            return false;
        }

        if (typeof post.data.complete !== "boolean") {
            return false;
        }
        if (!post.data.complete) {
            return false;
        }

        if (typeof post.data.comments !== "string") {
            return false;
        }
        if (post.data.comments.length > legal["max-comments-length"]) {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_COMPLETED;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post} post
     * @returns {void}
     */
    #addPost(application, post) {
        const index = application.posts.findIndex(_post => _post.page === post.page);

        if (index !== -1) {
            application.posts[index] = post;
        } else {
            application.posts.push(post);
        }
    }

    /**
     * @param {Application | null} application
     * @returns {Promise<Response>}
     */
    async #back(application = null) {
        let identification_number = null;

        switch (application?.page ?? null) {
            case PAGE_COMPLETED:
                application.page = PAGE_LEGAL;
                break;

            case PAGE_INTENDED_DEGREE_PROGRAM:
                application.page = PAGE_CHOICE_SUBJECT;
                break;

            case PAGE_INTENDED_DEGREE_PROGRAM_2:
                application.page = PAGE_INTENDED_DEGREE_PROGRAM;
                break;

            case PAGE_LEGAL:
                application.page = PAGE_PERSONAL_DATA;
                break;

            case PAGE_PERSONAL_DATA:
                application.page = PAGE_PORTRAIT;
                break;

            case PAGE_PORTRAIT:
                application.page = this.#showPreviousStudiesPage(
                    application
                ) ? PAGE_PREVIOUS_STUDIES : PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION;
                break;

            case PAGE_PREVIOUS_STUDIES:
                application.page = PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION;
                break;

            case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION:
                application.page = PAGE_INTENDED_DEGREE_PROGRAM_2;
                break;

            default:
                identification_number = false;
                break;
        }

        return {
            data: null,
            "identification-number": identification_number
        };
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenIntendedDegreeProgram}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #chosenIntendedDegreeProgram(application, post) {
        if (application.page !== PAGE_INTENDED_DEGREE_PROGRAM || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const intended_degree_program = await this.#getIntendedDegreeProgram();

        if (typeof post.data.subject !== "string") {
            return false;
        }
        if (post.data.subject === "") {
            return false;
        }
        const subject = intended_degree_program.subjects.find(_subject => _subject.id === post.data.subject) ?? null;
        if (subject === null) {
            return false;
        }

        if (typeof post.data.combination !== "string") {
            return false;
        }
        if (post.data.combination === "") {
            return false;
        }
        if (!subject.combinations.some(combination => combination.id === post.data.combination)) {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_INTENDED_DEGREE_PROGRAM_2;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenIntendedDegreeProgram2}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #chosenIntendedDegreeProgram2(application, post) {
        if (application.page !== PAGE_INTENDED_DEGREE_PROGRAM_2 || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const intended_degree_program_2 = await this.#getIntendedDegreeProgram2(
            this.#getPost(
                application,
                PAGE_INTENDED_DEGREE_PROGRAM
            ).data
        );

        if (intended_degree_program_2.combination["single-choice"] === null && post.data["single-choice"] !== null) {
            return false;
        }
        if (intended_degree_program_2.combination["single-choice"] !== null && (typeof post.data["single-choice"] !== "object"
            || Object.keys(post.data["single-choice"]).length === 0
            || !Object.keys(post.data["single-choice"]).every(key => typeof key === "string" && key !== "")
            || !Object.values(post.data["single-choice"]).every(value => typeof value === "string" && value !== "")
            || !intended_degree_program_2.combination["single-choice"].every(single_choice => single_choice.id in post.data["single-choice"])
            || !Object.entries(post.data["single-choice"]).every(([
                key,
                value
            ]) => {
                const single_choice = intended_degree_program_2.combination["single-choice"].find(_single_choice => _single_choice.id === key) ?? null;

                if (single_choice === null) {
                    return false;
                }

                return single_choice.choices.some(choice => choice.id === value);
            }))) {
            return false;
        }

        if (intended_degree_program_2.combination["multiple-choice"] === null && post.data["multiple-choice"] !== null) {
            return false;
        }
        if (intended_degree_program_2.combination["multiple-choice"] !== null && (typeof post.data["multiple-choice"] !== "object"
            || Object.keys(post.data["multiple-choice"]).length === 0
            || !Object.keys(post.data["multiple-choice"]).every(key => typeof key === "string" && key !== "")
            || !Object.values(post.data["multiple-choice"]).every(value => Array.isArray(value) && value.length > 0 && value.every(_value => typeof _value === "string" && _value !== ""))
            || !intended_degree_program_2.combination["multiple-choice"].every(multiple_choice => multiple_choice.id in post.data["multiple-choice"])
            || !Object.entries(post.data["multiple-choice"]).every(([
                key,
                value
            ]) => {
                const multiple_choice = intended_degree_program_2.combination["multiple-choice"].find(_multiple_choice => _multiple_choice.id === key) ?? null;

                if (multiple_choice === null) {
                    return false;
                }

                if (!value.every(_value => multiple_choice.choices.some(choice => choice.id === _value))) {
                    return false;
                }

                let ect = 0;
                for (const choice of multiple_choice.choices) {
                    if (value.includes(choice.id)) {
                        ect += choice.ect;
                    }
                }

                return ect === multiple_choice.ect;
            }))) {
            return false;
        }

        if (typeof post.data["further-information"] !== "string") {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: Portrait}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #chosenPortrait(application, post) {
        if (application.page !== PAGE_PORTRAIT || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const portrait = await this.#getPortrait();

        if (post.data.photo !== null && !(Array.isArray(post.data.photo) && post.data.photo.length > 0 && post.data.photo.every(char => typeof char === "number" && Number.isInteger(char) && char >= 0) && post.data.photo.length < portrait["photo-max-data-size"])) {
            return false;
        }
        if (portrait["required-photo"] && post.data.photo === null) {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_PERSONAL_DATA;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenPreviousStudies}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #chosenPreviousStudies(application, post) {
        if (application.page !== PAGE_PREVIOUS_STUDIES || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const previous_studies = await this.#getPreviousStudies();

        if (!Array.isArray(post.data["previous-studies"])) {
            return false;
        }
        if (post.data["previous-studies"].length === 0) {
            return false;
        }
        if (!post.data["previous-studies"].every(previous_study => {
            if (typeof previous_study !== "object") {
                return false;
            }

            if (typeof previous_study["certificate-type"] !== "string") {
                return false;
            }
            if (previous_study["certificate-type"] === "") {
                return false;
            }
            if (!previous_studies["certificate-types"].some(certificate_type => certificate_type.id === previous_study["certificate-type"])) {
                return false;
            }

            if (typeof previous_study["start-date"] !== "number") {
                return false;
            }
            if (!Number.isInteger(previous_study["start-date"])) {
                return false;
            }
            if (previous_study["start-date"] < previous_studies["min-start-date"]) {
                return false;
            }
            if (previous_study["start-date"] > previous_studies["max-start-date"]) {
                return false;
            }

            if (typeof previous_study["end-date"] !== "number") {
                return false;
            }
            if (!Number.isInteger(previous_study["end-date"])) {
                return false;
            }
            if (previous_study["end-date"] < previous_studies["min-end-date"]) {
                return false;
            }
            if (previous_study["end-date"] > previous_studies["max-end-date"]) {
                return false;
            }

            if (previous_study["end-date"] < previous_study["start-date"]) {
                return false;
            }

            if (typeof previous_study.university !== "string") {
                return false;
            }
            if (previous_study.university === "") {
                return false;
            }
            if (!previous_studies.schools.some(school => school.id === previous_study.university)) {
                return false;
            }

            if (typeof previous_study.subject !== "string") {
                return false;
            }
            if (previous_study.subject === "") {
                return false;
            }

            if (typeof previous_study.semesters !== "number") {
                return false;
            }
            if (!Number.isInteger(previous_study.semesters)) {
                return false;
            }
            if (previous_study.semesters < previous_studies["min-semesters"]) {
                return false;
            }
            if (previous_study.semesters > previous_studies["max-semesters"]) {
                return false;
            }

            if (typeof previous_study["degree-title"] !== "string") {
                return false;
            }
            if (previous_study["degree-title"] === "") {
                return false;
            }
            if (!previous_studies["degree-titles"].some(degree_title => degree_title.id === previous_study["degree-title"])) {
                return false;
            }

            if (typeof previous_study["certificate-country"] !== "string") {
                return false;
            }
            if (previous_study["certificate-country"] === "") {
                return false;
            }
            if (!previous_studies.countries.some(country => country.id === previous_study["certificate-country"])) {
                return false;
            }

            if (typeof previous_study["certificate-canton"] !== "string") {
                return false;
            }
            if (previous_study["certificate-canton"] === "") {
                return false;
            }
            if (!previous_studies.cantons.some(canton => canton.id === previous_study["certificate-canton"])) {
                return false;
            }

            if (typeof previous_study["certificate-place"] !== "string") {
                return false;
            }
            if (previous_study["certificate-place"] === "") {
                return false;
            }
            if (!previous_studies.places.some(place => place.id === previous_study["certificate-place"])) {
                return false;
            }

            return true;
        })) {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_PORTRAIT;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenSubject}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #chosenSubject(application, post) {
        if (application.page !== PAGE_CHOICE_SUBJECT || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const choice_subject = await this.#getChoiceSubject();

        if (typeof post.data["degree-program"] !== "string") {
            return false;
        }
        if (post.data["degree-program"] === "") {
            return false;
        }
        const degree_program = choice_subject["degree-programs"].find(_degree_program => _degree_program.id === post.data["degree-program"]) ?? null;
        if (degree_program === null) {
            return false;
        }

        if (typeof post.data.qualifications !== "object") {
            return false;
        }
        if (Object.keys(post.data.qualifications).length === 0) {
            return false;
        }
        if (!Object.keys(post.data.qualifications).every(qualification => typeof qualification === "string" && qualification !== "")) {
            return false;
        }
        if (!Object.values(post.data.qualifications).every(value => typeof value === "boolean")) {
            return false;
        }
        if (!degree_program.qualifications.every(qualification => qualification.id in post.data.qualifications)) {
            return false;
        }
        if (!degree_program.qualifications.filter(qualification => qualification.required).every(qualification => post.data.qualifications[qualification.id])) {
            return false;
        }
        if (!Object.keys(post.data.qualifications).every(qualification => degree_program.qualifications.some(_qualification => _qualification.id === qualification))) {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_INTENDED_DEGREE_PROGRAM;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenUniversityEntranceQualification}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #chosenUniversityEntranceQualification(application, post) {
        if (application.page !== PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const university_entrance_qualification = await this.#getUniversityEntranceQualification();

        if (typeof post.data["certificate-type"] !== "string") {
            return false;
        }
        if (post.data["certificate-type"] === "") {
            return false;
        }
        if (!university_entrance_qualification["certificate-types"].some(certificate_type => certificate_type.id === post.data["certificate-type"])) {
            return false;
        }

        if (typeof post.data["issue-date"] !== "number") {
            return false;
        }
        if (!Number.isInteger(post.data["issue-date"])) {
            return false;
        }
        if (post.data["issue-date"] < university_entrance_qualification["min-issue-date"]) {
            return false;
        }
        if (post.data["issue-date"] > university_entrance_qualification["max-issue-date"]) {
            return false;
        }

        if (typeof post.data.certificate !== "string") {
            return false;
        }
        if (post.data.certificate === "") {
            return false;
        }
        if (!university_entrance_qualification.certificates.some(certificate => certificate.id === post.data.certificate)) {
            return false;
        }

        if (typeof post.data["matura-canton"] !== "string") {
            return false;
        }
        if (post.data["matura-canton"] === "") {
            return false;
        }
        if (!university_entrance_qualification.cantons.some(canton => canton.id === post.data["matura-canton"])) {
            return false;
        }

        if (typeof post.data["upper-secondary-school"] !== "string") {
            return false;
        }
        if (post.data["upper-secondary-school"] === "") {
            return false;
        }
        if (!university_entrance_qualification.schools.some(school => school.id === post.data["upper-secondary-school"])) {
            return false;
        }

        if (typeof post.data["certificate-country"] !== "string") {
            return false;
        }
        if (post.data["certificate-country"] === "") {
            return false;
        }
        if (!university_entrance_qualification.countries.some(country => country.id === post.data["certificate-country"])) {
            return false;
        }

        if (typeof post.data["certificate-canton"] !== "string") {
            return false;
        }
        if (post.data["certificate-canton"] === "") {
            return false;
        }
        if (!university_entrance_qualification.cantons.some(canton => canton.id === post.data["certificate-canton"])) {
            return false;
        }

        if (typeof post.data["certificate-place"] !== "string") {
            return false;
        }
        if (post.data["certificate-place"] === "") {
            return false;
        }
        if (!university_entrance_qualification.places.some(place => place.id === post.data["certificate-place"])) {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = this.#showPreviousStudiesPage(
            application
        ) ? PAGE_PREVIOUS_STUDIES : PAGE_PORTRAIT;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ConfirmedIdentificationNumber}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #confirmedIdentificationNumber(application, post) {
        if (application.page !== PAGE_IDENTIFICATION_NUMBER || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_CHOICE_SUBJECT;

        return true;
    }

    /**
     * @param {Post & {data: Create}} post
     * @returns {Promise<string | false | Label[]>}
     */
    async #create(post) {
        if (post.page !== PAGE_CREATE) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const start = await this.#getStart();

        if (typeof post.data.semester !== "string") {
            return false;
        }
        if (post.data.semester === "") {
            return false;
        }
        if (!start.semesters.some(semester => semester.id === post.data.semester)) {
            return false;
        }

        if (typeof post.data.password !== "string") {
            return false;
        }
        if (post.data.password === "") {
            return false;
        }
        if (post.data.password.length < start["min-password-length"]) {
            return false;
        }

        if (typeof post.data["confirm-password"] !== "string") {
            return false;
        }
        if (post.data["confirm-password"] === "") {
            return false;
        }
        if (post.data["confirm-password"].length < start["min-password-length"]) {
            return false;
        }

        if (post.data.password !== post.data["confirm-password"]) {
            return false;
        }

        /**
         * @type {Application}
         */
        const application = {
            "identification-number": this.#randomIdentificationNumber(),
            page: PAGE_IDENTIFICATION_NUMBER,
            posts: []
        };

        this.#applications.push(application);

        this.#addPost(
            application,
            post
        );

        return application["identification-number"];
    }

    /**
     * @param {Application} application
     * @param {Post & {data: FilledPersonalData}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async #filledPersonalData(application, post) {
        if (application.page !== PAGE_PERSONAL_DATA || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const personal_data = await this.#getPersonalData();

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
        if (post.data["registration-number"] !== "" && !REGISTRATION_NUMBER_FORMAT.test(post.data["registration-number"])) {
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

        if (typeof post.data["house-number"] !== "number") {
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

        if (typeof post.data["postal-code"] !== "number") {
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
        if (!personal_data.places.some(place => place.id === post.data.place)) {
            return false;
        }

        for (const phone_type of [
            "home",
            "mobile",
            "business"
        ]) {
            if (typeof post.data[`${phone_type}-phone-area-code`] !== "string") {
                return false;
            }
            if (personal_data[`required-phone-${phone_type}`] && post.data[`${phone_type}-phone-area-code`] === "") {
                return false;
            }
            if (post.data[`${phone_type}-phone-area-code`] !== "" && !personal_data["area-codes"].some(area_code => area_code.id === post.data[`${phone_type}-phone-area-code`])) {
                return false;
            }
            if (post.data[`${phone_type}-phone-area-code`] === "" && post.data[`${phone_type}-phone-number`] !== "") {
                return false;
            }

            if (typeof post.data[`${phone_type}-phone-number`] !== "string") {
                return false;
            }
            if (personal_data[`required-${phone_type}`] && post.data[`${phone_type}-phone-number`] === "") {
                return false;
            }
            if (post.data[`${phone_type}-phone-number`] !== "" && !PHONE_NUMBER_FORMAT.test(post.data[`${phone_type}-phone-number`])) {
                return false;
            }
            if (post.data[`${phone_type}-phone-area-code`] !== "" && post.data[`${phone_type}-phone-number`] === "") {
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
        if (!personal_data.languages.some(language => language.id === post.data["mother-language"])) {
            return false;
        }

        if (typeof post.data["correspondence-language"] !== "string") {
            return false;
        }
        if (post.data["correspondence-language"] === "") {
            return false;
        }
        if (!personal_data.languages.some(language => language.id === post.data["correspondence-language"])) {
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
        if (post.data["old-age-survivar-insurance-number"] !== "" && !OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT.test(post.data["old-age-survivar-insurance-number"])) {
            return false;
        }

        if (typeof post.data.nationally !== "string") {
            return false;
        }
        if (post.data.nationally === "") {
            return false;
        }
        if (!personal_data.countries.some(country => country.id === post.data.nationally)) {
            return false;
        }

        if (typeof post.data["origin-place"] !== "string") {
            return false;
        }
        if (post.data["origin-place"] === "") {
            return false;
        }
        if (!personal_data.places.some(place => place.id === post.data["origin-place"])) {
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

                if (typeof post.data["parents-address-house-number"] !== "number") {
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

                if (typeof post.data["parents-address-postal-code"] !== "number") {
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
                if (!personal_data.places.some(place => place.id === post.data["parents-address-place"])) {
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

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_LEGAL;

        return true;
    }

    /**
     * @param {Application | null} application
     * @returns {Promise<Response>}
     */
    async #get(application = null) {
        let page = application?.page ?? null;
        let data = {};
        let can_back = true;
        let identification_number = null;

        switch (page) {
            case PAGE_CHOICE_SUBJECT:
                data = await this.#getChoiceSubject(
                    this.#getPost(
                        application,
                        PAGE_CHOICE_SUBJECT
                    )?.data ?? null
                );
                can_back = false;
                break;

            case PAGE_COMPLETED:
                break;

            case PAGE_IDENTIFICATION_NUMBER:
                data = await this.#getIdentificationNumber(
                    application["identification-number"]
                );
                can_back = false;
                break;

            case PAGE_INTENDED_DEGREE_PROGRAM:
                data = await this.#getIntendedDegreeProgram(
                    this.#getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM
                    )?.data ?? null
                );
                break;

            case PAGE_INTENDED_DEGREE_PROGRAM_2:
                data = await this.#getIntendedDegreeProgram2(
                    this.#getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM
                    ).data,
                    this.#getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM_2
                    )?.data ?? null
                );
                break;

            case PAGE_LEGAL:
                data = await this.#getLegal(
                    this.#getPost(
                        application,
                        PAGE_CHOICE_SUBJECT
                    ).data,
                    this.#getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM
                    ).data,
                    this.#getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM_2
                    ).data,
                    this.#getPost(
                        application,
                        PAGE_LEGAL
                    )?.data ?? null
                );
                break;

            case PAGE_PERSONAL_DATA:
                data = await this.#getPersonalData(
                    this.#getPost(
                        application,
                        PAGE_PERSONAL_DATA
                    )?.data ?? null
                );
                break;

            case PAGE_PORTRAIT:
                data = await this.#getPortrait(
                    this.#getPost(
                        application,
                        PAGE_PORTRAIT
                    )?.data ?? null
                );
                break;

            case PAGE_PREVIOUS_STUDIES:
                data = await this.#getPreviousStudies(
                    this.#getPost(
                        application,
                        PAGE_PREVIOUS_STUDIES
                    )?.data ?? null
                );
                break;

            case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION:
                data = await this.#getUniversityEntranceQualification(
                    this.#getPost(
                        application,
                        PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION
                    )?.data ?? null
                );
                break;

            default:
                page = PAGE_START;
                data = await this.#getStart();
                can_back = false;
                identification_number = false;
                break;
        }

        return {
            data: {
                page,
                data,
                "can-back": can_back
            },
            "identification-number": identification_number
        };
    }

    /**
     * @param {string | null} identification_number
     * @returns {Application | null}
     */
    #getApplication(identification_number = null) {
        if (identification_number === null) {
            return null;
        }

        return this.#applications.find(application => application["identification-number"] === identification_number) ?? null;
    }

    /**
     * @param {express.request} req
     * @returns {Application | null}
     */
    #getApplicationFromRequest(req) {
        return this.#getApplication(
            req.cookies[COOKIE_IDENTIFICATION_NUMBER] ?? null
        );
    }

    /**
     * @returns {Promise<AreaCode[]>}
     */
    async #getAreaCodes() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/AreaCode/area-codes.json`
        );
    }

    /**
     * @returns {Promise<Canton[]>}
     */
    async #getCantons() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Canton/cantons.json`
        );
    }

    /**
     * @returns {Promise<Certificate[]>}
     */
    async #getCertificates() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Certificate/certificates.json`
        );
    }

    /**
     * @returns {Promise<CertificateType[]>}
     */
    async #getCertificateTypes() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/CertificateType/certificate-types.json`
        );
    }

    /**
     * @param {ChosenSubject | null} values
     * @returns {Promise<ChoiceSubject>}
     */
    async #getChoiceSubject(values = null) {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/ChoiceSubject/choice-subject.json`
            ),
            "degree-programs": await this.#getDegreePrograms(),
            values
        };
    }

    /**
     * @returns {Promise<ConfigApi>}
     */
    async #getConfigApi() {
        this.#config_api ??= (await import("../../../../flux-config-api/src/Adapter/Api/ConfigApi.mjs")).ConfigApi.new(
            await (await import("../../../../flux-config-api/src/Adapter/ValueProviderImplementation/getValueProviderImplementations.mjs")).getValueProviderImplementations(
                CONFIG_ENV_PREFIX
            )
        );

        return this.#config_api;
    }

    /**
     * @returns {Promise<Country[]>}
     */
    async #getCountries() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Country/countries.json`
        );
    }

    /**
     * @returns {Promise<DegreeProgram[]>}
     */
    async #getDegreePrograms() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/DegreeProgram/degree-programs.json`
        );
    }

    /**
     * @returns {Promise<DegreeTitle[]>}
     */
    async #getDegreeTitles() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/DegreeTitle/degree-titles.json`
        );
    }

    /**
     * @returns {Promise<ExpressServerApi>}
     */
    async #getExpressServerApi() {
        this.#express_server_api ??= (await import("../../../../flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs")).ExpressServerApi.new(
            this.#shutdown_handler
        );

        return this.#express_server_api;
    }

    /**
     * @param {string} identification_number
     * @returns {Promise<IdentificationNumber>}
     */
    async #getIdentificationNumber(identification_number) {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/IdentificationNumber/identification-number.json`
            ),
            "identification-number": identification_number
        };
    }

    /**
     * @param {ChosenIntendedDegreeProgram | null} values
     * @returns {Promise<IntendedDegreeProgram>}
     */
    async #getIntendedDegreeProgram(values = null) {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/IntendedDegreeProgram/intended-degree-program.json`
            ),
            subjects: await this.#getSubjects(),
            values
        };
    }

    /**
     * @param {ChosenIntendedDegreeProgram} chosen_intended_degree_program
     * @param {ChosenIntendedDegreeProgram2 | null} values
     * @returns {Promise<IntendedDegreeProgram2>}
     */
    async #getIntendedDegreeProgram2(chosen_intended_degree_program, values = null) {
        const subject = (await this.#getSubjects()).find(_subject => _subject.id === chosen_intended_degree_program.subject);

        const _subject = structuredClone(subject);
        delete _subject.combinations;

        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/IntendedDegreeProgram2/intended-degree-program-2.json`
            ),
            subject: _subject,
            combination: subject.combinations.find(combination => combination.id === chosen_intended_degree_program.combination),
            values
        };
    }

    /**
     * @returns {Promise<JsonApi>}
     */
    async #getJsonApi() {
        this.#json_api ??= (await import("../../../../flux-json-api/src/Adapter/Api/JsonApi.mjs")).JsonApi.new();

        return this.#json_api;
    }

    /**
     * @returns {Promise<Language[]>}
     */
    async #getLanguages() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Language/languages.json`
        );
    }

    /**
     * @returns {Promise<Layout[]>}
     */
    async #getLayout() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Layout/layout.json`
        );
    }

    /**
     * @param {ChosenSubject} chosen_subject
     * @param {ChosenIntendedDegreeProgram} chosen_intended_degree_program
     * @param {ChosenIntendedDegreeProgram2} chosen_intended_degree_program_2
     * @param {AcceptedLegal | null} values
     * @returns {Promise<Legal>}
     */
    async #getLegal(chosen_subject, chosen_intended_degree_program, chosen_intended_degree_program_2, values = null) {
        const subject = (await this.#getSubjects()).find(_subject => _subject.id === chosen_intended_degree_program.subject);

        const _subject = structuredClone(subject);
        delete _subject.combinations;

        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/Legal/legal.json`
            ),
            "degree-program": (await this.#getDegreePrograms()).find(degree_program => degree_program.id === chosen_subject["degree-program"]),
            subject: _subject,
            combination: subject.combinations.find(combination => combination.id === chosen_intended_degree_program.combination),
            "single-choice": chosen_intended_degree_program_2["single-choice"],
            "multiple-choice": chosen_intended_degree_program_2["multiple-choice"],
            values
        };
    }

    /**
     * @param {FilledPersonalData | null} values
     * @returns {Promise<PersonalData>}
     */
    async #getPersonalData(values = null) {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/PersonalData/personal-data.json`
            ),
            salutations: await this.#getSalutations(),
            "registration-number-format": `${REGISTRATION_NUMBER_FORMAT}`,
            countries: await this.#getCountries(),
            places: await this.#getPlaces(),
            "area-codes": await this.#getAreaCodes(),
            "phone-number-format": `${PHONE_NUMBER_FORMAT}`,
            languages: await this.#getLanguages(),
            "min-birth-date": MIN_BIRTH_DATE,
            "max-birth-date": MAX_BIRTH_DATE,
            "old-age-survivar-insurance-number-format": `${OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT}`,
            values
        };
    }

    /**
     * @returns {Promise<Place[]>}
     */
    async #getPlaces() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Place/places.json`
        );
    }

    /**
     * @param {ChosenPortrait | null} values
     * @returns {Promise<Portrait>}
     */
    async #getPortrait(values = null) {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/Portrait/portrait.json`
            ),
            values
        };
    }

    /**
     * @param {ChosenPreviousStudies | null} values
     * @returns {Promise<PreviousStudies>}
     */
    async #getPreviousStudies(values = null) {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/PreviousStudies/previous-studies.json`
            ),
            "certificate-types": await this.#getCertificateTypes(),
            "min-start-date": MIN_START_DATE,
            "max-start-date": MAX_START_DATE,
            "min-end-date": MIN_END_DATE,
            "max-end-date": MAX_END_DATE,
            schools: await this.#getSchools(),
            "degree-titles": await this.#getDegreeTitles(),
            countries: await this.#getCountries(),
            cantons: await this.#getCantons(),
            places: await this.#getPlaces(),
            values
        };
    }

    /**
     * @param {Application} application
     * @param {string} page
     * @returns {Post | null}
     */
    #getPost(application, page) {
        return application.posts.find(post => post.page === page) ?? null;
    }

    /**
     * @returns {Promise<express.Router>}
     */
    async #getRouter() {
        const router = express.Router();

        router.use(express.json({
            limit: "500KB"
        }));

        router.use(cookieParser());

        router.post("/api/back", async (req, res) => {
            try {
                this.#response(
                    req,
                    res,
                    await this.#back(
                        this.#getApplicationFromRequest(
                            req
                        )
                    )
                );
            } catch (error) {
                console.error(error);

                res.status(500).end();
            }
        });

        router.get("/api/get", async (req, res) => {
            try {
                this.#response(
                    req,
                    res,
                    await this.#get(
                        this.#getApplicationFromRequest(
                            req
                        )
                    )
                );
            } catch (error) {
                console.error(error);

                res.status(500).end();
            }
        });

        router.get("/api/layout", async (req, res) => {
            try {
                this.#response(
                    req,
                    res,
                    {
                        data: await this.#getLayout(),
                        "identification-number": null
                    }
                );
            } catch (error) {
                console.error(error);

                res.status(500).end();
            }
        });

        router.post("/api/post", async (req, res) => {
            try {
                if ((req.body ?? null) === null) {
                    res.status(400).end();
                    return;
                }

                this.#response(
                    req,
                    res,
                    await this.#post(
                        req.body,
                        this.#getApplicationFromRequest(
                            req
                        )
                    )
                );
            } catch (error) {
                console.error(error);

                res.status(500).end();
            }
        });

        router.use("/", express.static(join(__dirname, "..", "..", "..", "..", "flux-studis-selfservice-frontend", "src")));

        return router;
    }

    /**
     * @returns {Promise<Salutation[]>}
     */
    async #getSalutations() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Salutation/salutations.json`
        );
    }

    /**
     * @returns {Promise<School[]>}
     */
    async #getSchools() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/School/schools.json`
        );
    }

    /**
     * @returns {Promise<Semester[]>}
     */
    async #getSemesters() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Semester/semesters.json`
        );
    }

    /**
     * @returns {Promise<Start>}
     */
    async #getStart() {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/Start/start.json`
            ),
            semesters: await this.#getSemesters()
        };
    }

    /**
     * @returns {Promise<SubjectWithCombinations[]>}
     */
    async #getSubjects() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Subject/subjects.json`
        );
    }

    /**
     * @param {ChosenUniversityEntranceQualification | null} values
     * @returns {Promise<UniversityEntranceQualification>}
     */
    async #getUniversityEntranceQualification(values = null) {
        return {
            ...await (await this.#getJsonApi()).importJson(
                `${__dirname}/../Data/UniversityEntranceQualification/university-entrance-qualification.json`
            ),
            "certificate-types": await this.#getCertificateTypes(),
            "min-issue-date": MIN_ISSUE_DATE,
            "max-issue-date": MAX_ISSUE_DATE,
            certificates: await this.#getCertificates(),
            cantons: await this.#getCantons(),
            schools: await this.#getSchools(),
            countries: await this.#getCountries(),
            places: await this.#getPlaces(),
            values
        };
    }

    /**
     * @param {Post} post
     * @param {Application | null} application
     * @returns {Promise<Response>}
     */
    async #post(post, application = null) {
        let ok = true;
        let identification_number = null;
        let error_messages = null;

        if (typeof post === "object") {
            if (application !== null) {
                switch (application.page) {
                    case PAGE_CHOICE_SUBJECT: {
                        const result = await this.#chosenSubject(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_IDENTIFICATION_NUMBER: {
                        const result = await this.#confirmedIdentificationNumber(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_INTENDED_DEGREE_PROGRAM: {
                        const result = await this.#chosenIntendedDegreeProgram(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_INTENDED_DEGREE_PROGRAM_2: {
                        const result = await this.#chosenIntendedDegreeProgram2(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_LEGAL: {
                        const result = await this.#acceptedLegal(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_PERSONAL_DATA: {
                        const result = await this.#filledPersonalData(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_PORTRAIT: {
                        const result = await this.#chosenPortrait(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_PREVIOUS_STUDIES: {
                        const result = await this.#chosenPreviousStudies(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION: {
                        const result = await this.#chosenUniversityEntranceQualification(
                            application,
                            post
                        );

                        if (typeof result === "boolean") {
                            ok = result;
                        } else {
                            ok = false;
                            error_messages = result;
                        }
                    }
                        break;

                    default:
                        ok = false;
                        break;
                }
            } else {
                switch (post.page) {
                    case PAGE_CREATE: {
                        const result = await this.#create(
                            post
                        );

                        if (typeof result === "string") {
                            identification_number = result;
                        } else {
                            if (result === false) {
                                ok = result;
                            } else {
                                ok = false;
                                error_messages = result;
                            }
                        }
                    }
                        break;

                    case PAGE_RESUME: {
                        const result = await this.#resume(
                            post
                        );

                        if (typeof result === "string") {
                            identification_number = result;
                        } else {
                            if (result === false) {
                                ok = result;
                            } else {
                                ok = false;
                                error_messages = result;
                            }
                        }
                    }
                        break;

                    default:
                        ok = false;
                        break;
                }
            }
        } else {
            ok = false;
        }

        return {
            data: {
                ok,
                "error-messages": error_messages
            },
            "identification-number": identification_number
        };
    }

    /**
     * @returns {string}
     */
    #randomIdentificationNumber() {
        return Math.random().toString(36).substring(2, 12);
    }

    /**
     * @param {express.request} req
     * @param {express.response} res
     * @param {Response} response
     * @returns {void}
     */
    #response(req, res, response) {
        if (response["identification-number"] === false) {
            if ((req.cookies[COOKIE_IDENTIFICATION_NUMBER] ?? null) !== null) {
                res.clearCookie(COOKIE_IDENTIFICATION_NUMBER, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: req.secure
                });
            }
        } else {
            if (response["identification-number"] !== null) {
                res.cookie(COOKIE_IDENTIFICATION_NUMBER, response["identification-number"], {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: req.secure
                });
            }
        }

        res.json(response.data);
    }

    /**
     * @param {Post & {data: Resume}} post
     * @returns {Promise<string | false | Label[]>}
     */
    async #resume(post) {
        if (post.page !== PAGE_RESUME) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const start = await this.#getStart();

        if (typeof post.data["identification-number"] !== "string") {
            return false;
        }
        if (post.data["identification-number"] === "") {
            return false;
        }

        if (typeof post.data.password !== "string") {
            return false;
        }
        if (post.data.password === "") {
            return false;
        }
        if (post.data.password.length < start["min-password-length"]) {
            return false;
        }

        const application = this.#getApplication(
            post.data["identification-number"]
        );

        if (application === null) {
            return false;
        }

        if ((this.#getPost(
            application,
            PAGE_CREATE
        )?.data.password ?? null) !== post.data.password) {
            return false;
        }

        return application["identification-number"];
    }

    /**
     * @param {Application} application
     * @returns {boolean}
     */
    #showPreviousStudiesPage(application) {
        return this.#getPost(
            application,
            PAGE_CHOICE_SUBJECT
        )?.data?.qualifications?.already_studied ?? false;
    }
}
