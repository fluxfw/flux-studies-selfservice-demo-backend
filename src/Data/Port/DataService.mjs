/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Legal/AcceptedLegal.mjs").AcceptedLegal} AcceptedLegal */
/** @typedef {import("../../Response/ApiResponse.mjs").ApiResponse} ApiResponse */
/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/AreaCode/AreaCode.mjs").AreaCode} AreaCode */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Canton/Canton.mjs").Canton} Canton */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Certificate/Certificate.mjs").Certificate} Certificate */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/CertificateType/CertificateType.mjs").CertificateType} CertificateType */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram2/ChosenIntendedDegreeProgram2.mjs").ChosenIntendedDegreeProgram2} ChosenIntendedDegreeProgram2 */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Portrait/ChosenPortrait.mjs").ChosenPortrait} ChosenPortrait */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PreviousStudies/ChosenPreviousStudies.mjs").ChosenPreviousStudies} ChosenPreviousStudies */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IdentificationNumber/ConfirmedIdentificationNumber.mjs").ConfirmedIdentificationNumber} ConfirmedIdentificationNumber */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Country/Country.mjs").Country} Country */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Create/Create.mjs").Create} Create */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/DegreeTitle/DegreeTitle.mjs").DegreeTitle} DegreeTitle */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PersonalData/FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IdentificationNumber/IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram/IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram2/IntendedDegreeProgram2.mjs").IntendedDegreeProgram2} IntendedDegreeProgram2 */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IssueYear/IssueYear.mjs").IssueYear} IssueYear */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Language/Language.mjs").Language} Language */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Layout/Layout.mjs").Layout} Layout */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Legal/Legal.mjs").Legal} Legal */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Menu/Menu.mjs").Menu} Menu */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PersonalData/PersonalData.mjs").PersonalData} PersonalData */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Place/Place.mjs").Place} Place */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Place/PlaceWithPostalCode.mjs").PlaceWithPostalCode} PlaceWithPostalCode */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Portrait/Portrait.mjs").Portrait} Portrait */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PreviousStudies/PreviousStudies.mjs").PreviousStudies} PreviousStudies */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Resume/Resume.mjs").Resume} Resume */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Salutation/Salutation.mjs").Salutation} Salutation */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/School/School.mjs").School} School */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Semester/Semester.mjs").Semester} Semester */
/** @typedef {import("../../Session/Session.mjs").Session} Session */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Start/Start.mjs").Start} Start */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Subject/SubjectWithCombinations.mjs").SubjectWithCombinations} SubjectWithCombinations */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/UniversityEntranceQualification/UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */

export class DataService {
    /**
     * @type {Application[]}}
     */
    #applications;
    /**
     * @type {Session[]}}
     */
    #sessions;

    /**
     * @returns {DataService}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {
        this.#applications = [];
        this.#sessions = [];
    }

    /**
     * @param {Application} application
     * @param {Post & {data: AcceptedLegal}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async acceptedLegal(application, post) {
        return (await import("../Command/AcceptedLegalCommand.mjs")).AcceptedLegalCommand.new(
            this
        )
            .acceptedLegal(
                application,
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post} post
     * @returns {Promise<void>}
     */
    async addPost(application, post) {
        await (await import("../Command/AddPostCommand.mjs")).AddPostCommand.new()
            .addPost(
                application,
                post
            );
    }

    /**
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async back(session_number = null) {
        return (await import("../Command/BackCommand.mjs")).BackCommand.new(
            this
        )
            .back(
                session_number
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenIntendedDegreeProgram}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenIntendedDegreeProgram(application, post) {
        return (await import("../Command/ChosenIntendedDegreeProgramCommand.mjs")).ChosenIntendedDegreeProgramCommand.new(
            this
        )
            .chosenIntendedDegreeProgram(
                application,
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenIntendedDegreeProgram2}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenIntendedDegreeProgram2(application, post) {
        return (await import("../Command/ChosenIntendedDegreeProgram2Command.mjs")).ChosenIntendedDegreeProgram2Command.new(
            this
        )
            .chosenIntendedDegreeProgram2(
                application,
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenPortrait}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenPortrait(application, post) {
        return (await import("../Command/ChosenPortraitCommand.mjs")).ChosenPortraitCommand.new(
            this
        )
            .chosenPortrait(
                application,
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenPreviousStudies}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenPreviousStudies(application, post) {
        return (await import("../Command/ChosenPreviousStudiesCommand.mjs")).ChosenPreviousStudiesCommand.new(
            this
        )
            .chosenPreviousStudies(
                application,
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenSubject}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenSubject(application, post) {
        return (await import("../Command/ChosenSubjectCommand.mjs")).ChosenSubjectCommand.new(
            this
        )
            .chosenSubject(
                application,
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ChosenUniversityEntranceQualification}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenUniversityEntranceQualification(application, post) {
        return (await import("../Command/ChosenUniversityEntranceQualificationCommand.mjs")).ChosenUniversityEntranceQualificationCommand.new(
            this
        )
            .chosenUniversityEntranceQualification(
                application,
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: ConfirmedIdentificationNumber}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async confirmedIdentificationNumber(application, post) {
        return (await import("../Command/ConfirmedIdentificationNumberCommand.mjs")).ConfirmedIdentificationNumberCommand.new(
            this
        )
            .confirmedIdentificationNumber(
                application,
                post
            );
    }

    /**
     * @param {Post & {data: Create}} post
     * @returns {Promise<string | false | Label[]>}
     */
    async create(post) {
        return (await import("../Command/CreateCommand.mjs")).CreateCommand.new(
            this,
            this.#applications
        )
            .create(
                post
            );
    }

    /**
     * @param {Application} application
     * @param {Post & {data: FilledPersonalData}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async filledPersonalData(application, post) {
        return (await import("../Command/FilledPersonalDataCommand.mjs")).FilledPersonalDataCommand.new(
            this
        )
            .filledPersonalData(
                application,
                post
            );
    }

    /**
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async get(session_number = null) {
        return (await import("../Command/GetCommand.mjs")).GetCommand.new(
            this
        )
            .get(
                session_number
            );
    }

    /**
     * @param {string} identification_number
     * @returns {Promise<Application | null>}
     */
    async getApplicationByIdentificationNumber(identification_number) {
        return (await import("../Command/GetApplicationByIdentificationNumberCommand.mjs")).GetApplicationByIdentificationNumberCommand.new(
            this.#applications
        )
            .getApplicationByIdentificationNumber(
                identification_number
            );
    }

    /**
     * @param {string} session_number
     * @returns {Promise<Application | null>}
     */
    async getApplicationBySessionNumber(session_number) {
        return (await import("../Command/GetApplicationBySessionNumberCommand.mjs")).GetApplicationBySessionNumberCommand.new(
            this,
            this.#sessions
        )
            .getApplicationBySessionNumber(
                session_number
            );
    }

    /**
     * @returns {Promise<AreaCode[]>}
     */
    async getAreaCodes() {
        return (await import("../Command/GetAreaCodesCommand.mjs")).GetAreaCodesCommand.new()
            .getAreaCodes();
    }

    /**
     * @returns {Promise<Canton[]>}
     */
    async getCantons() {
        return (await import("../Command/GetCantonsCommand.mjs")).GetCantonsCommand.new()
            .getCantons();
    }

    /**
     * @returns {Promise<Certificate[]>}
     */
    async getCertificates() {
        return (await import("../Command/GetCertificatesCommand.mjs")).GetCertificatesCommand.new()
            .getCertificates();
    }

    /**
     * @returns {Promise<CertificateType[]>}
     */
    async getCertificateTypes() {
        return (await import("../Command/GetCertificateTypesCommand.mjs")).GetCertificateTypesCommand.new()
            .getCertificateTypes();
    }

    /**
     * @param {ChosenSubject | null} values
     * @returns {Promise<ChoiceSubject>}
     */
    async getChoiceSubject(values = null) {
        return (await import("../Command/GetChoiceSubjectCommand.mjs")).GetChoiceSubjectCommand.new(
            this
        )
            .getChoiceSubject(
                values
            );
    }

    /**
     * @returns {Promise<Country[]>}
     */
    async getCountries() {
        return (await import("../Command/GetCountriesCommand.mjs")).GetCountriesCommand.new()
            .getCountries();
    }

    /**
     * @returns {Promise<DegreeProgram[]>}
     */
    async getDegreePrograms() {
        return (await import("../Command/GetDegreeProgramsCommand.mjs")).GetDegreeProgramsCommand.new()
            .getDegreePrograms();
    }

    /**
     * @returns {Promise<DegreeTitle[]>}
     */
    async getDegreeTitles() {
        return (await import("../Command/GetDegreeTitlesCommand.mjs")).GetDegreeTitlesCommand.new()
            .getDegreeTitles();
    }

    /**
     * @param {string} identification_number
     * @returns {Promise<IdentificationNumber>}
     */
    async getIdentificationNumber(identification_number) {
        return (await import("../Command/GetIdentificationNumberCommand.mjs")).GetIdentificationNumberCommand.new()
            .getIdentificationNumber(
                identification_number
            );
    }

    /**
     * @param {ChosenIntendedDegreeProgram | null} values
     * @returns {Promise<IntendedDegreeProgram>}
     */
    async getIntendedDegreeProgram(values = null) {
        return (await import("../Command/GetIntendedDegreeProgramCommand.mjs")).GetIntendedDegreeProgramCommand.new(
            this
        )
            .getIntendedDegreeProgram(
                values
            );
    }

    /**
     * @param {ChosenIntendedDegreeProgram} chosen_intended_degree_program
     * @param {ChosenIntendedDegreeProgram2 | null} values
     * @returns {Promise<IntendedDegreeProgram2>}
     */
    async getIntendedDegreeProgram2(chosen_intended_degree_program, values = null) {
        return (await import("../Command/GetIntendedDegreeProgram2Command.mjs")).GetIntendedDegreeProgram2Command.new(
            this
        )
            .getIntendedDegreeProgram2(
                chosen_intended_degree_program,
                values
            );
    }

    /**
     * @returns {Promise<IssueYear[]>}
     */
    async getIssueYears() {
        return (await import("../Command/GetIssueYearsCommand.mjs")).GetIssueYearsCommand.new()
            .getIssueYears();
    }

    /**
     * @returns {Promise<Language[]>}
     */
    async getLanguages() {
        return (await import("../Command/GetLanguagesCommand.mjs")).GetLanguagesCommand.new()
            .getLanguages();
    }

    /**
     * @returns {Promise<Layout>}
     */
    async getLayout() {
        return (await import("../Command/GetLayoutCommand.mjs")).GetLayoutCommand.new()
            .getLayout();
    }

    /**
     * @param {ChosenSubject} chosen_subject
     * @param {ChosenIntendedDegreeProgram} chosen_intended_degree_program
     * @param {ChosenIntendedDegreeProgram2} chosen_intended_degree_program_2
     * @param {AcceptedLegal | null} values
     * @returns {Promise<Legal>}
     */
    async getLegal(chosen_subject, chosen_intended_degree_program, chosen_intended_degree_program_2, values = null) {
        return (await import("../Command/GetLegalCommand.mjs")).GetLegalCommand.new(
            this
        )
            .getLegal(
                chosen_subject,
                chosen_intended_degree_program,
                chosen_intended_degree_program_2,
                values
            );
    }

    /**
     * @param {Application | null} application
     * @returns {Promise<Menu>}
     */
    async getMenu(application = null) {
        return (await import("../Command/GetMenuCommand.mjs")).GetMenuCommand.new(
            this
        )
            .getMenu(
                application
            );
    }

    /**
     * @param {FilledPersonalData | null} values
     * @returns {Promise<PersonalData>}
     */
    async getPersonalData(values = null) {
        return (await import("../Command/GetPersonalDataCommand.mjs")).GetPersonalDataCommand.new(
            this
        )
            .getPersonalData(
                values
            );
    }

    /**
     * @returns {Promise<Place[]>}
     */
    async getPlaces() {
        return (await import("../Command/GetPlacesCommand.mjs")).GetPlacesCommand.new(
            this
        )
            .getPlaces();
    }

    /**
     * @returns {Promise<PlaceWithPostalCode[]>}
     */
    async getPlacesWithPostalCode() {
        return (await import("../Command/GetPlacesWithPostalCodeCommand.mjs")).GetPlacesWithPostalCodeCommand.new()
            .getPlacesWithPostalCode();
    }

    /**
     * @param {ChosenPortrait | null} values
     * @returns {Promise<Portrait>}
     */
    async getPortrait(values = null) {
        return (await import("../Command/GetPortraitCommand.mjs")).GetPortraitCommand.new()
            .getPortrait(
                values
            );
    }

    /**
     * @param {Application} application
     * @param {string} page
     * @returns {Promise<Post | null>}
     */
    async getPost(application, page) {
        return (await import("../Command/GetPostCommand.mjs")).GetPostCommand.new()
            .getPost(
                application,
                page
            );
    }

    /**
     * @param {ChosenPreviousStudies | null} values
     * @returns {Promise<PreviousStudies>}
     */
    async getPreviousStudies(values = null) {
        return (await import("../Command/GetPreviousStudiesCommand.mjs")).GetPreviousStudiesCommand.new(
            this
        )
            .getPreviousStudies(
                values
            );
    }

    /**
     * @returns {Promise<Salutation[]>}
     */
    async getSalutations() {
        return (await import("../Command/GetSalutationsCommand.mjs")).GetSalutationsCommand.new()
            .getSalutations();
    }

    /**
     * @returns {Promise<School[]>}
     */
    async getSchools() {
        return (await import("../Command/GetSchoolsCommand.mjs")).GetSchoolsCommand.new()
            .getSchools();
    }

    /**
     * @returns {Promise<Semester[]>}
     */
    async getSemesters() {
        return (await import("../Command/GetSemestersCommand.mjs")).GetSemestersCommand.new()
            .getSemesters();
    }

    /**
     * @returns {Promise<Start>}
     */
    async getStart() {
        return (await import("../Command/GetStartCommand.mjs")).GetStartCommand.new(
            this
        )
            .getStart();
    }

    /**
     * @returns {Promise<SubjectWithCombinations[]>}
     */
    async getSubjects() {
        return (await import("../Command/GetSubjectsCommand.mjs")).GetSubjectsCommand.new()
            .getSubjects();
    }

    /**
     * @param {ChosenUniversityEntranceQualification | null} values
     * @returns {Promise<UniversityEntranceQualification>}
     */
    async getUniversityEntranceQualification(values = null) {
        return (await import("../Command/GetUniversityEntranceQualificationCommand.mjs")).GetUniversityEntranceQualificationCommand.new(
            this
        )
            .getUniversityEntranceQualification(
                values
            );
    }

    /**
     * @returns {Promise<ApiResponse>}
     */
    async layout() {
        return (await import("../Command/LayoutCommand.mjs")).LayoutCommand.new(
            this
        )
            .layout();
    }

    /**
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async logout(session_number = null) {
        return (await import("../Command/LogoutCommand.mjs")).LogoutCommand.new(
            this
        )
            .logout(
                session_number
            );
    }

    /**
     * @param {string} id
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async menu(id, session_number = null) {
        return (await import("../Command/MenuCommand.mjs")).MenuCommand.new(
            this
        )
            .menu(
                id,
                session_number
            );
    }

    /**
     * @param {string} identification_number
     * @returns {Promise<string>}
     */
    async newSession(identification_number) {
        return (await import("../Command/NewSessionCommand.mjs")).NewSessionCommand.new(
            this,
            this.#sessions
        )
            .newSession(
                identification_number
            );
    }

    /**
     * @param {Post} post
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async post(post, session_number = null) {
        return (await import("../Command/PostCommand.mjs")).PostCommand.new(
            this
        )
            .post(
                post,
                session_number
            );
    }

    /**
     * @returns {Promise<string>}
     */
    async randomIdentificationNumber() {
        return (await import("../Command/RandomIdentificationNumberCommand.mjs")).RandomIdentificationNumberCommand.new()
            .randomIdentificationNumber();
    }

    /**
     * @returns {Promise<string>}
     */
    async randomSessionNumber() {
        return (await import("../Command/RandomSessionNumberCommand.mjs")).RandomSessionNumberCommand.new()
            .randomSessionNumber();
    }

    /**
     * @param {string} session_number
     * @returns {Promise<void>}
     */
    async removeSession(session_number) {
        await (await import("../Command/RemoveSessionCommand.mjs")).RemoveSessionCommand.new(
            this.#sessions
        )
            .removeSession(
                session_number
            );
    }

    /**
     * @param {Post & {data: Resume}} post
     * @returns {Promise<string | false | Label[]>}
     */
    async resume(post) {
        return (await import("../Command/ResumeCommand.mjs")).ResumeCommand.new(
            this
        )
            .resume(
                post
            );
    }

    /**
     * @param {Application} application
     * @returns {Promise<boolean>}
     */
    async showPreviousStudiesPage(application) {
        return (await import("../Command/ShowPreviousStudiesPageCommand.mjs")).ShowPreviousStudiesPageCommand.new(
            this
        )
            .showPreviousStudiesPage(
                application
            );
    }
}
