import { BIRTH_DATE_FORMAT } from "../Data/PersonalData/BIRTH_DATE_FORMAT.mjs";
import { COOKIE_IDENTIFICATION_NUMBER } from "../Response/COOKIE.mjs";
import cookieParser from "cookie-parser";
import express from "express";
import { fileURLToPath } from "node:url";
import { MAX_BIRTH_DATE } from "../Data/PersonalData/MAX_BIRTH_DATE.mjs";
import { MAX_COMMENTS_LENGTH } from "../Data/Legal/MAX_COMMENTS_LENGTH.mjs";
import { MAX_HOUSE_NUMBER } from "../Data/PersonalData/MAX_HOUSE_NUMBER.mjs";
import { MAX_ISSUE_DATE } from "../Data/UniversityEntranceQualification/MAX_ISSUE_DATE.mjs";
import { MAX_POSTAL_CODE } from "../Data/PersonalData/MAX_POSTAL_CODE.mjs";
import { MIN_BIRTH_DATE } from "../Data/PersonalData/MIN_BIRTH_DATE.mjs";
import { MIN_HOUSE_NUMBER } from "../Data/PersonalData/MIN_HOUSE_NUMBER.mjs";
import { MIN_ISSUE_DATE } from "../Data/UniversityEntranceQualification/MIN_ISSUE_DATE.mjs";
import { MIN_PASSWORD_LENGTH } from "../Data/Start/MIN_PASSWORD_LENGTH.mjs";
import { MIN_POSTAL_CODE } from "../Data/PersonalData/MIN_POSTAL_CODE.mjs";
import { OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT } from "../Data/PersonalData/OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT.mjs";
import { PHONE_FORMAT } from "../Data/PersonalData/PHONE_FORMAT.mjs";
import { REGISTRATION_NUMBER_FORMAT } from "../Data/PersonalData/REGISTRATION_NUMBER_FORMAT.mjs";
import { dirname, join } from "node:path";
import { PAGE_CHOICE_SUBJECT, PAGE_COMPLETED, PAGE_CREATE, PAGE_IDENTIFICATION_NUMBER, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL, PAGE_PERSONAL_DATA, PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_RESUME, PAGE_START, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Legal/AcceptedLegal.mjs").AcceptedLegal} AcceptedLegal */
/** @typedef {import("../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/AreaCode/AreaCode.mjs").AreaCode} AreaCode */
/** @typedef {import("../../../node_modules/flux-json-api/src/Adapter/ImportJson/AssertImportJson.mjs").AssertImportJson} AssertImportJson */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Canton/Canton.mjs").Canton} Canton */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Certificate/Certificate.mjs").Certificate} Certificate */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/CertificateType/CertificateType.mjs").CertificateType} CertificateType */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../node_modules/flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs").ExpressServerApi} ExpressServerApi */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram2/ChosenIntendedDegreeProgram2.mjs").ChosenIntendedDegreeProgram2} ChosenIntendedDegreeProgram2 */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Portrait/ChosenPortrait.mjs").ChosenPortrait} ChosenPortrait */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/PreviousStudies/ChosenPreviousStudies.mjs").ChosenPreviousStudies} ChosenPreviousStudies */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IdentificationNumber/ConfirmedIdentificationNumber.mjs").ConfirmedIdentificationNumber} ConfirmedIdentificationNumber */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Country/Country.mjs").Country} Country */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Create/Create.mjs").Create} Create */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/PersonalData/FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IdentificationNumber/IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram/IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram2/IntendedDegreeProgram2.mjs").IntendedDegreeProgram2} IntendedDegreeProgram2 */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Language/Language.mjs").Language} Language */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Legal/Legal.mjs").Legal} Legal */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/PersonalData/PersonalData.mjs").PersonalData} PersonalData */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Place/Place.mjs").Place} Place */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Portrait/Portrait.mjs").Portrait} Portrait */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/PreviousStudies/PreviousStudies.mjs").PreviousStudies} PreviousStudies */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */
/** @typedef {import("../Response/Response.mjs").Response} Response */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Resume/Resume.mjs").Resume} Resume */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Salutation/Salutation.mjs").Salutation} Salutation */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/School/School.mjs").School} School */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Semester/Semester.mjs").Semester} Semester */
/** @typedef {import( "../../../node_modules/flux-shutdown-handler-api/src/Adapter/ShutdownHandler/ShutdownHandler.mjs").ShutdownHandler} ShutdownHandler */
/** @typedef {import("../../../node_modules/flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs").ShutdownHandlerApi} ShutdownHandlerApi */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Start/Start.mjs").Start} Start */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/SubjectWithCombinations/SubjectWithCombinations.mjs").SubjectWithCombinations} SubjectWithCombinations */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/UniversityEntranceQualification/UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */

const __dirname = dirname(fileURLToPath(import.meta.url));

export class StudiesSelfserviceDemoBackendApi {
    /**
     * @type {Application[]}}
     */
    #applications;
    /**
     * @type {ExpressServerApi | null}
     */
    #express_server_api = null;
    /**
     * @type {AssertImportJson | null}
     */
    #import_json = null;
    /**
     * @type {ShutdownHandler | null}
     */
    #shutdown_handler = null;
    /**
     * @type {ShutdownHandlerApi | null}
     */
    #shutdown_handler_api = null;

    /**
     * @returns {StudiesSelfserviceDemoBackendApi}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {
        this.#applications = [];
    }

    /**
     * @returns {Promise<void>}
     */
    async init() {
        this.#shutdown_handler_api ??= await this.#getShutdownHandlerApi();
        this.#shutdown_handler ??= this.#shutdown_handler_api.getShutdownHandler();

        this.#import_json ??= (await import("../../../node_modules/flux-json-api/src/Adapter/ImportJson/AssertImportJson.mjs")).AssertImportJson.new();

        this.#express_server_api ??= await this.#getExpressServerApi();
    }

    /**
     * @returns {Promise<void>}
     */
    async runServer() {
        await this.#express_server_api.runExpressServer(
            async () => this.#getRouter()
        );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: AcceptedLegal}} post
     * @returns {Promise<boolean>}
     */
    async #acceptedLegal(application, post) {
        if (application.page !== PAGE_LEGAL || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (typeof post.data["not-disqualified"] !== "boolean" || !post.data["not-disqualified"]) {
            return false;
        }

        if (typeof post.data.agb !== "boolean" || !post.data.agb) {
            return false;
        }

        if (typeof post.data.complete !== "boolean" || !post.data.complete) {
            return false;
        }

        if (typeof post.data.comments !== "string" || post.data.comments.length > MAX_COMMENTS_LENGTH) {
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
                application.page = PAGE_PREVIOUS_STUDIES;
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
     * @returns {Promise<boolean>}
     */
    async #chosenIntendedDegreeProgram(application, post) {
        if (application.page !== PAGE_INTENDED_DEGREE_PROGRAM || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (typeof post.data.subject !== "string" || post.data.subject === "") {
            return false;
        }

        if (typeof post.data.combination !== "string" || post.data.combination === "") {
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
     * @returns {Promise<boolean>}
     */
    async #chosenIntendedDegreeProgram2(application, post) {
        if (application.page !== PAGE_INTENDED_DEGREE_PROGRAM_2 || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (!(typeof post.data["single-choice"] === "object" || post.data["single-choice"] === null)) {
            return false;
        }

        if (!(typeof post.data["multiple-choice"] === "object" || post.data["multiple-choice"] === null)) {
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
     * @returns {Promise<boolean>}
     */
    async #chosenPortrait(application, post) {
        if (application.page !== PAGE_PORTRAIT || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (!(post.data.photo === null || (Array.isArray(post.data.photo) && !post.data.photo.some(char => typeof char !== "number")))) {
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
     * @param {Post & {data: PreviousStudies}} post
     * @returns {Promise<boolean>}
     */
    async #chosenPreviousStudies(application, post) {
        if (application.page !== PAGE_PREVIOUS_STUDIES || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
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
     * @returns {Promise<boolean>}
     */
    async #chosenSubject(application, post) {
        if (application.page !== PAGE_CHOICE_SUBJECT || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (typeof post.data["degree-program"] !== "string" || post.data["degree-program"] === "") {
            return false;
        }

        if (typeof post.data.qualifications !== "object" || Object.keys(post.data.qualifications).some(key => !(typeof key === "string" || key === "")) || Object.values(post.data.qualifications).some(value => typeof value !== "boolean")) {
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
     * @returns {Promise<boolean>}
     */
    async #chosenUniversityEntranceQualification(application, post) {
        if (application.page !== PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (typeof post.data["certificate-type"] !== "string" || post.data["certificate-type"] === "") {
            return false;
        }

        if (typeof post.data["issue-date"] !== "number" || post.data["issue-date"] < MIN_ISSUE_DATE || post.data["issue-date"] > MAX_ISSUE_DATE) {
            return false;
        }

        if (typeof post.data.certificate !== "string" || post.data.certificate === "") {
            return false;
        }

        if (typeof post.data["matura-canton"] !== "string" || post.data["matura-canton"] === "") {
            return false;
        }

        if (typeof post.data["upper-secondary-school"] !== "string" || post.data["upper-secondary-school"] === "") {
            return false;
        }

        if (typeof post.data["certificate-country"] !== "string" || post.data["certificate-country"] === "") {
            return false;
        }

        if (typeof post.data["certificate-canton"] !== "string" || post.data["certificate-canton"] === "") {
            return false;
        }

        if (typeof post.data["certificate-place"] !== "string" || post.data["certificate-place"] === "") {
            return false;
        }

        this.#addPost(
            application,
            post
        );

        application.page = PAGE_PREVIOUS_STUDIES;

        return true;
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ConfirmedIdentificationNumber}} post
     * @returns {Promise<boolean>}
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
     * @returns {Promise<string | false>}
     */
    async #create(post) {
        if (post.page !== PAGE_CREATE) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (typeof post.data.semester !== "string" || post.data.semester === "") {
            return false;
        }

        if (typeof post.data.password !== "string" || post.data.password.length < MIN_PASSWORD_LENGTH) {
            return false;
        }

        if (typeof post.data["confirm-password"] !== "string" || post.data["confirm-password"].length < MIN_PASSWORD_LENGTH) {
            return false;
        }

        if (post.data.password !== post.data["confirm-password"]) {
            return false;
        }

        /**
         * @type {Application}
         */
        const application = {
            "identification-number": Math.random().toString(36).substring(2, 12),
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
     * @param {Post & {data: PersonalData}} post
     * @returns {Promise<boolean>}
     */
    async #filledPersonalData(application, post) {
        if (application.page !== PAGE_PERSONAL_DATA || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (typeof post.data["salutation"] !== "string" || post.data["salutation"] === "") {
            return false;
        }

        if (typeof post.data["first-name"] !== "string" || post.data["first-name"] === "") {
            return false;
        }

        if (typeof post.data["second-first-name"] !== "string") {
            return false;
        }

        if (!Array.isArray(post.data["additional-first-names"]) || post.data["additional-first-names"].some(name => !(typeof name === "string" || name === ""))) {
            return false;
        }

        if (typeof post.data["last-name"] !== "string" || post.data["last-name"] === "") {
            return false;
        }

        if (typeof post.data["registration-number"] !== "string" || !(post.data["registration-number"] === "" || REGISTRATION_NUMBER_FORMAT.test(post.data["registration-number"]))) {
            return false;
        }

        if (typeof post.data.country !== "string" || post.data.country === "") {
            return false;
        }

        if (typeof post.data["extra-address-line"] !== "string") {
            return false;
        }

        if (typeof post.data.street !== "string" || post.data.street === "") {
            return false;
        }

        if (typeof post.data["house-number"] !== "number" || post.data["house-number"] < MIN_HOUSE_NUMBER || post.data["house-number"] > MAX_HOUSE_NUMBER) {
            return false;
        }

        if (typeof post.data["postal-office-box"] !== "string") {
            return false;
        }

        if (typeof post.data["postal-code"] !== "number" || post.data["postal-code"] < MIN_POSTAL_CODE || post.data["postal-code"] > MAX_POSTAL_CODE) {
            return false;
        }

        if (typeof post.data.place !== "string" || post.data.place === "") {
            return false;
        }

        if (typeof post.data["phone-area-code"] !== "string" || (post.data["phone-area-code"] === "" && post.data.phone !== "")) {
            return false;
        }

        if (typeof post.data.phone !== "string" || !(post.data.phone === "" || PHONE_FORMAT.test(post.data.phone)) || (post.data["phone-area-code"] !== "" && post.data.phone === "")) {
            return false;
        }

        if (typeof post.data["mobile-area-code"] !== "string" || (post.data["mobile-area-code"] === "" && post.data.mobile !== "")) {
            return false;
        }

        if (typeof post.data.mobile !== "string" || !(post.data.mobile === "" || PHONE_FORMAT.test(post.data.mobile)) || (post.data["mobile-area-code"] !== "" && post.data.mobile === "")) {
            return false;
        }

        if (typeof post.data.email !== "string") {
            return false;
        }

        if (typeof post.data["mother-language"] !== "string" || post.data["mother-language"] === "") {
            return false;
        }

        if (typeof post.data["correspondence-language"] !== "string" || post.data["correspondence-language"] === "") {
            return false;
        }

        if (typeof post.data["birth-date"] !== "string" || post.data["birth-date"] === "" || !BIRTH_DATE_FORMAT.test(post.data["birth-date"]) || post.data["birth-date"] < MIN_BIRTH_DATE || post.data["birth-date"] > MAX_BIRTH_DATE) {
            return false;
        }

        if (typeof post.data["old-age-survivar-insurance-number"] !== "string" || !(post.data["old-age-survivar-insurance-number"] === "" || OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT.test(post.data["old-age-survivar-insurance-number"]))) {
            return false;
        }

        if (typeof post.data.nationally !== "string" || post.data.nationally === "") {
            return false;
        }

        if (typeof post.data["origin-place"] !== "string" || post.data["origin-place"] === "") {
            return false;
        }

        if (typeof post.data["parent-address"] !== "boolean") {
            return false;
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
        return this.#import_json.importJson(
            `${__dirname}/../Data/AreaCode/area-codes.json`
        );
    }

    /**
     * @returns {Promise<Canton[]>}
     */
    async #getCantons() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/Canton/cantons.json`
        );
    }

    /**
     * @returns {Promise<Certificate[]>}
     */
    async #getCertificates() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/Certificate/certificates.json`
        );
    }

    /**
     * @returns {Promise<CertificateType[]>}
     */
    async #getCertificateTypes() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/CertificateType/certificate-types.json`
        );
    }

    /**
     * @param {ChosenSubject | null} values
     * @returns {Promise<ChoiceSubject>}
     */
    async #getChoiceSubject(values = null) {
        return {
            ...await this.#import_json.importJson(
                `${__dirname}/../Data/ChoiceSubject/choice-subject.json`
            ),
            "degree-programs": await this.#getDegreePrograms(),
            values
        };
    }

    /**
     * @returns {Promise<Country[]>}
     */
    async #getCountries() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/Country/countries.json`
        );
    }

    /**
     * @returns {Promise<DegreeProgram[]>}
     */
    async #getDegreePrograms() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/DegreeProgram/degree-programs.json`
        );
    }

    /**
     * @returns {Promise<ExpressServerApi>}
     */
    async #getExpressServerApi() {
        const express_server = (await import("../../../node_modules/flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs")).ExpressServerApi.new(
            this.#shutdown_handler
        );

        await express_server.init();

        return express_server;
    }

    /**
     * @param {string} identification_number
     * @returns {Promise<IdentificationNumber>}
     */
    async #getIdentificationNumber(identification_number) {
        return {
            ...await this.#import_json.importJson(
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
            ...await this.#import_json.importJson(
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
            ...await this.#import_json.importJson(
                `${__dirname}/../Data/IntendedDegreeProgram2/intended-degree-program-2.json`
            ),
            subject: _subject,
            combination: subject.combinations.find(combination => combination.id === chosen_intended_degree_program.combination),
            values
        };
    }

    /**
     * @returns {Promise<Language[]>}
     */
    async #getLanguages() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/Language/languages.json`
        );
    }

    /**
     * @param {ChosenIntendedDegreeProgram} chosen_intended_degree_program
     * @param {ChosenIntendedDegreeProgram2} chosen_intended_degree_program_2
     * @param {AcceptedLegal | null} values
     * @returns {Promise<Legal>}
     */
    async #getLegal(chosen_intended_degree_program, chosen_intended_degree_program_2, values = null) {
        const subject = (await this.#getSubjects()).find(_subject => _subject.id === chosen_intended_degree_program.subject);

        const _subject = structuredClone(subject);
        delete _subject.combinations;

        return {
            ...await this.#import_json.importJson(
                `${__dirname}/../Data/Legal/legal.json`
            ),
            subject: _subject,
            combination: subject.combinations.find(combination => combination.id === chosen_intended_degree_program.combination),
            "single-choice": chosen_intended_degree_program_2["single-choice"],
            "multiple-choice": chosen_intended_degree_program_2["multiple-choice"],
            "max-comments-length": MAX_COMMENTS_LENGTH,
            values
        };
    }

    /**
     * @param {FilledPersonalData | null} values
     * @returns {Promise<PersonalData>}
     */
    async #getPersonalData(values = null) {
        return {
            ...await this.#import_json.importJson(
                `${__dirname}/../Data/PersonalData/personal-data.json`
            ),
            salutations: await this.#getSalutations(),
            "registration-number-format": `${REGISTRATION_NUMBER_FORMAT}`,
            countries: await this.#getCountries(),
            "min-house-number": MIN_HOUSE_NUMBER,
            "max-house-number": MAX_HOUSE_NUMBER,
            "min-postal-code": MIN_POSTAL_CODE,
            "max-postal-code": MAX_POSTAL_CODE,
            places: await this.#getPlaces(),
            "area-codes": await this.#getAreaCodes(),
            "phone-format": `${PHONE_FORMAT}`,
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
        return this.#import_json.importJson(
            `${__dirname}/../Data/Place/places.json`
        );
    }

    /**
     * @param {ChosenPortrait | null} values
     * @returns {Promise<Portrait>}
     */
    async #getPortrait(values = null) {
        return {
            ...await this.#import_json.importJson(
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
            ...await this.#import_json.importJson(
                `${__dirname}/../Data/PreviousStudies/previous-studies.json`
            ),
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
            limit: "100KB"
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

        router.use("/", express.static(join(__dirname, "..", "..", "..", "node_modules", "flux-studies-selfservice-frontend", "src")));

        return router;
    }

    /**
     * @returns {Promise<Salutation[]>}
     */
    async #getSalutations() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/Salutation/salutations.json`
        );
    }

    /**
     * @returns {Promise<School[]>}
     */
    async #getSchools() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/School/schools.json`
        );
    }

    /**
     * @returns {Promise<Semester[]>}
     */
    async #getSemesters() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/Semester/semesters.json`
        );
    }

    /**
     * @returns {Promise<ShutdownHandlerApi>}
     */
    async #getShutdownHandlerApi() {
        const shutdown_handler_api = (await import("../../../node_modules/flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs")).ShutdownHandlerApi.new();

        await shutdown_handler_api.init();

        return shutdown_handler_api;
    }

    /**
     * @returns {Promise<Start>}
     */
    async #getStart() {
        return {
            ...await this.#import_json.importJson(
                `${__dirname}/../Data/Start/start.json`
            ),
            semesters: await this.#getSemesters(),
            "min-password-length": MIN_PASSWORD_LENGTH
        };
    }

    /**
     * @returns {Promise<SubjectWithCombinations[]>}
     */
    async #getSubjects() {
        return this.#import_json.importJson(
            `${__dirname}/../Data/Subject/subjects.json`
        );
    }

    /**
     * @param {ChosenUniversityEntranceQualification | null} values
     * @returns {Promise<UniversityEntranceQualification>}
     */
    async #getUniversityEntranceQualification(values = null) {
        return {
            ...await this.#import_json.importJson(
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

        if (typeof post === "object") {
            if (application !== null) {
                switch (application.page) {
                    case PAGE_CHOICE_SUBJECT:
                        ok = await this.#chosenSubject(
                            application,
                            post
                        );
                        break;

                    case PAGE_IDENTIFICATION_NUMBER:
                        ok = await this.#confirmedIdentificationNumber(
                            application,
                            post
                        );
                        break;

                    case PAGE_INTENDED_DEGREE_PROGRAM:
                        ok = await this.#chosenIntendedDegreeProgram(
                            application,
                            post
                        );
                        break;

                    case PAGE_INTENDED_DEGREE_PROGRAM_2:
                        ok = await this.#chosenIntendedDegreeProgram2(
                            application,
                            post
                        );
                        break;

                    case PAGE_LEGAL:
                        ok = await this.#acceptedLegal(
                            application,
                            post
                        );
                        break;

                    case PAGE_PERSONAL_DATA:
                        ok = await this.#filledPersonalData(
                            application,
                            post
                        );
                        break;

                    case PAGE_PORTRAIT:
                        ok = await this.#chosenPortrait(
                            application,
                            post
                        );
                        break;

                    case PAGE_PREVIOUS_STUDIES:
                        ok = await this.#chosenPreviousStudies(
                            application,
                            post
                        );
                        break;

                    case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION:
                        ok = await this.#chosenUniversityEntranceQualification(
                            application,
                            post
                        );
                        break;

                    default:
                        ok = false;
                        break;
                }
            } else {
                switch (post.page) {
                    case PAGE_CREATE: {
                        const _identification_number = await this.#create(
                            post
                        );

                        if (_identification_number !== false) {
                            identification_number = _identification_number;
                        } else {
                            ok = _identification_number;
                        }
                    }
                        break;

                    case PAGE_RESUME: {
                        const _identification_number = await this.#resume(
                            post
                        );

                        if (_identification_number !== false) {
                            identification_number = _identification_number;
                        } else {
                            ok = _identification_number;
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
                ok
            },
            "identification-number": identification_number
        };
    }

    /**
     * @param {express.request} req
     * @param {express.response} res
     * @param {Response} response
     * @returns {void}
     */
    #response(req, res, response) {
        if (response["identification-number"] === false) {
            res.clearCookie(COOKIE_IDENTIFICATION_NUMBER);
        } else {
            if (response["identification-number"] !== null) {
                res.cookie(COOKIE_IDENTIFICATION_NUMBER, response["identification-number"], {
                    httpOnly: true,
                    secure: req.secure
                });
            }
        }

        res.json(response.data);
    }

    /**
     * @param {Post & {data: Resume}} post
     * @returns {Promise<string | false>}
     */
    async #resume(post) {
        if (post.page !== PAGE_RESUME) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        if (typeof post.data["identification-number"] !== "string" || post.data["identification-number"] === "") {
            return false;
        }

        if (typeof post.data.password !== "string" || post.data.password.length < MIN_PASSWORD_LENGTH) {
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
}
