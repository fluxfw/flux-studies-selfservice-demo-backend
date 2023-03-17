/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class AddPostCommand {
    /**
     * @returns {AddPostCommand}
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
     * @param {Post} post
     * @returns {Promise<void>}
     */
    async addPost(application, post) {
        const index = application.posts.findIndex(_post => _post.page === post.page);

        if (index !== -1) {
            application.posts[index] = post;
        } else {
            application.posts.push(post);
        }
    }
}
