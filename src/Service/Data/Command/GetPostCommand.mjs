/** @typedef {import("../../../Adapter/Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */

export class GetPostCommand {
    /**
     * @returns {GetPostCommand}
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
     * @param {Application} application
     * @param {string} page
     * @returns {Promise<Post | null>}
     */
    async getPost(application, page) {
        return application.posts.find(post => post.page === page) ?? null;
    }
}
