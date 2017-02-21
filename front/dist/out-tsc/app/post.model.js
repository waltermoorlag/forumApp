var Post = (function () {
    function Post(obj) {
        this.author = obj.author;
        this.title = obj.title;
        this.body = obj.body;
        this.date = obj.date;
        this.comments = obj.comments;
        this.isEdit = obj.isEdit || false;
    }
    return Post;
}());
export { Post };
//# sourceMappingURL=../../../src/app/post.model.js.map