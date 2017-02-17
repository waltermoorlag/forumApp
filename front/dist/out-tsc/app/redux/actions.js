export var LOGIN_USER = 'LOGIN_USER';
export var LOGOUT_USER = 'LOGOUT_USER';
export var EDIT_POST = 'EDIT_POST';
export var CREATE_POST = 'CREATE_POST';
export var DELETE_POST = 'DELETE_POST';
export var CREATE_COMMENT = 'CREATE_COMMENT';
export var EDIT_COMMENT = 'EDIT_COMMENT';
export var DELETE_COMMENT = 'DELETE_COMMENT';
export var CARGAR_POST = 'CARGAR_POST';
export var POSTEANDO = 'POSTEANDO';
export var NO_POSTEANDO = 'NO_POSTEANDO';
export var posteando = function () {
    return { type: POSTEANDO, };
};
export var no_posteando = function () {
    return { type: NO_POSTEANDO, };
};
export var login = function (user) {
    return { type: LOGIN_USER,
        user: user };
};
export var logout = function (user) {
    return { type: LOGOUT_USER,
        user: user };
};
export var create_post = function (post) {
    return { type: CREATE_POST,
        post: post };
};
export var cargar_post = function (posts) {
    return { type: CARGAR_POST,
        posts: posts };
};
export var edit_post = function (post) {
    return { type: EDIT_POST,
        post: post };
};
export var delete_post = function (post) {
    return { type: DELETE_POST,
        post: post };
};
export var create_comment = function (comment) {
    return { type: CREATE_COMMENT,
        comment: comment };
};
export var edit_comment = function (comment) {
    return { type: EDIT_COMMENT,
        comment: comment };
};
export var delete_comment = function (comment) {
    return { type: DELETE_COMMENT,
        comment: comment };
};
//# sourceMappingURL=../../../../src/app/redux/actions.js.map