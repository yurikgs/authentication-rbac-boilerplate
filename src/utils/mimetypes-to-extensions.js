"use strict";
exports.__esModule = true;
exports.imageMimeToExtension = void 0;
var common_1 = require("@nestjs/common");
var imageMimeToExtension = function (mimetype) {
    if (!(mimetype == 'image/jpeg' || mimetype == 'image/png')) {
        throw new common_1.BadRequestException('Invalid Format. Please send a valid image jpeg/png file');
    }
    var extension = mimetype.split('image/')[1];
    return extension;
};
exports.imageMimeToExtension = imageMimeToExtension;
