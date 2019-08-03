function isPost(jsonData) {
<<<<<<< HEAD
    return jsonData.hasOwnProperty('html') &&
        jsonData.hasOwnProperty('title') && jsonData.hasOwnProperty('slug');
}

function isTag(jsonData) {
    return jsonData.hasOwnProperty('name') && jsonData.hasOwnProperty('slug') &&
        jsonData.hasOwnProperty('description') && jsonData.hasOwnProperty('parent');
}

function isUser(jsonData) {
    return jsonData.hasOwnProperty('bio') && jsonData.hasOwnProperty('website') &&
        jsonData.hasOwnProperty('profile_image') && jsonData.hasOwnProperty('location');
}

function isNav(jsonData) {
    return jsonData.hasOwnProperty('label') && jsonData.hasOwnProperty('url') &&
        jsonData.hasOwnProperty('slug') && jsonData.hasOwnProperty('current');
=======
    return Object.prototype.hasOwnProperty.call(jsonData, 'html') &&
        Object.prototype.hasOwnProperty.call(jsonData, 'title') && Object.prototype.hasOwnProperty.call(jsonData, 'slug');
}

function isTag(jsonData) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'name') && Object.prototype.hasOwnProperty.call(jsonData, 'slug') &&
        Object.prototype.hasOwnProperty.call(jsonData, 'description') && Object.prototype.hasOwnProperty.call(jsonData, 'feature_image');
}

function isUser(jsonData) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'bio') && Object.prototype.hasOwnProperty.call(jsonData, 'website') &&
    Object.prototype.hasOwnProperty.call(jsonData, 'profile_image') && Object.prototype.hasOwnProperty.call(jsonData, 'location');
}

function isNav(jsonData) {
    return Object.prototype.hasOwnProperty.call(jsonData, 'label') && Object.prototype.hasOwnProperty.call(jsonData, 'url') &&
    Object.prototype.hasOwnProperty.call(jsonData, 'slug') && Object.prototype.hasOwnProperty.call(jsonData, 'current');
>>>>>>> newversion/master
}

module.exports = {
    isPost: isPost,
    isTag: isTag,
    isUser: isUser,
    isNav: isNav
};
