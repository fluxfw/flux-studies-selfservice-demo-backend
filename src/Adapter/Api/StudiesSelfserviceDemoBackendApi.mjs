import { BIRTH_DATE_FORMAT } from "../Data/PersonalData/BIRTH_DATE_FORMAT.mjs";
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
import { dirname, join } from "node:path";
import { PAGE_CHOICE_SUBJECT, PAGE_COMPLETED, PAGE_CREATE, PAGE_IDENTIFICATION_NUMBER, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL, PAGE_PERSONAL_DATA, PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_RESUME, PAGE_START, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../flux-studies-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Legal/AcceptedLegal.mjs").AcceptedLegal} AcceptedLegal */
/** @typedef {import("../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/AreaCode/AreaCode.mjs").AreaCode} AreaCode */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Canton/Canton.mjs").Canton} Canton */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Certificate/Certificate.mjs").Certificate} Certificate */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/CertificateType/CertificateType.mjs").CertificateType} CertificateType */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../../flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs").ExpressServerApi} ExpressServerApi */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram2/ChosenIntendedDegreeProgram2.mjs").ChosenIntendedDegreeProgram2} ChosenIntendedDegreeProgram2 */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Portrait/ChosenPortrait.mjs").ChosenPortrait} ChosenPortrait */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/PreviousStudies/ChosenPreviousStudies.mjs").ChosenPreviousStudies} ChosenPreviousStudies */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/IdentificationNumber/ConfirmedIdentificationNumber.mjs").ConfirmedIdentificationNumber} ConfirmedIdentificationNumber */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Country/Country.mjs").Country} Country */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Create/Create.mjs").Create} Create */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Degree/Degree.mjs").Degree} Degree */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/PersonalData/FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/IdentificationNumber/IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram/IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram2/IntendedDegreeProgram2.mjs").IntendedDegreeProgram2} IntendedDegreeProgram2 */
/** @typedef {import("../../../../flux-json-api/src/Adapter/Api/JsonApi.mjs").JsonApi} JsonApi */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Language/Language.mjs").Language} Language */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Legal/Legal.mjs").Legal} Legal */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/PersonalData/PersonalData.mjs").PersonalData} PersonalData */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Place/Place.mjs").Place} Place */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Portrait/Portrait.mjs").Portrait} Portrait */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/PreviousStudies/PreviousStudies.mjs").PreviousStudies} PreviousStudies */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */
/** @typedef {import("../Response/Response.mjs").Response} Response */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Resume/Resume.mjs").Resume} Resume */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Salutation/Salutation.mjs").Salutation} Salutation */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/School/School.mjs").School} School */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Semester/Semester.mjs").Semester} Semester */
/** @typedef {import("../../../../flux-shutdown-handler-api/src/Adapter/ShutdownHandler/ShutdownHandler.mjs").ShutdownHandler} ShutdownHandler */
/** @typedef {import("../../../../flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs").ShutdownHandlerApi} ShutdownHandlerApi */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Start/Start.mjs").Start} Start */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/Subject/SubjectWithCombinations.mjs").SubjectWithCombinations} SubjectWithCombinations */
/** @typedef {import("../../../../flux-studies-selfservice-frontend/src/Adapter/UniversityEntranceQualification/UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */

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
     * @type {JsonApi | null}
     */
    #json_api = null;
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
        await this.#getShutdownHandler();
    }

    /**
     * @returns {Promise<void>}
     */
    async runServer() {
        await (await this.#getExpressServerApi()).runExpressServer(
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
     * @returns {Promise<boolean>}
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
     * @returns {Promise<boolean>}
     */
    async #chosenPortrait(application, post) {
        if (application.page !== PAGE_PORTRAIT || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const portrait = await this.#getPortrait();

        if (post.data.photo !== null && !(Array.isArray(post.data.photo) && post.data.photo.length > 0 && post.data.photo.every(char => typeof char === "number" && Number.isInteger(char) && char >= 0))) {
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
     * @returns {Promise<boolean>}
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

            if (typeof previous_study.degree !== "string") {
                return false;
            }
            if (previous_study.degree === "") {
                return false;
            }
            if (!previous_studies.degrees.some(degree => degree.id === previous_study.degree)) {
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
     * @returns {Promise<boolean>}
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
     * @returns {Promise<boolean>}
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
     * @returns {Promise<boolean>}
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
     * @returns {Promise<Degree[]>}
     */
    async #getDegrees() {
        return (await this.#getJsonApi()).importJson(
            `${__dirname}/../Data/Degree/degrees.json`
        );
    }

    /**
     * @returns {Promise<ExpressServerApi>}
     */
    async #getExpressServerApi() {
        if (this.#express_server_api === null) {
            this.#express_server_api ??= (await import("../../../../flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs")).ExpressServerApi.new(
                await this.#getShutdownHandler()
            );

            await this.#express_server_api.init();
        }

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
        if (this.#json_api === null) {
            this.#json_api ??= (await import("../../../../flux-json-api/src/Adapter/Api/JsonApi.mjs")).JsonApi.new();

            await this.#json_api.init();
        }

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
            degrees: await this.#getDegrees(),
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

        router.use("/", express.static(join(__dirname, "..", "..", "..", "..", "flux-studies-selfservice-frontend", "src")));

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
     * @returns {Promise<ShutdownHandler>}
     */
    async #getShutdownHandler() {
        this.#shutdown_handler ??= await (await this.#getShutdownHandlerApi()).getShutdownHandler();

        return this.#shutdown_handler;
    }

    /**
     * @returns {Promise<ShutdownHandlerApi>}
     */
    async #getShutdownHandlerApi() {
        if (this.#shutdown_handler_api === null) {
            this.#shutdown_handler_api ??= (await import("../../../../flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs")).ShutdownHandlerApi.new();

            await this.#shutdown_handler_api.init();
        }

        return this.#shutdown_handler_api;
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
}
