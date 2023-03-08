"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.FileController = void 0;
var common_1 = require("@nestjs/common");
var path_1 = require("path");
var platform_express_1 = require("@nestjs/platform-express");
var FileController = /** @class */ (function () {
    function FileController(fileService) {
        this.fileService = fileService;
    }
    // watch out - FileInterceptor field name represents html inut tag 'name' attribute
    FileController.prototype.uploadSomeFile = function (file) {
        return this.fileService.uploadFile((0, path_1.join)(__dirname, '..', '..', '..', 'storage', 'generic', "".concat(file.originalname)), file);
    };
    FileController.prototype.uploadMultipleFiles = function (files) {
        return this.fileService.uploadMultipleFiles((0, path_1.join)(__dirname, '..', '..', '..', 'storage', 'generic'), files);
    };
    FileController.prototype.uploadMultipleFromManyFields = function (files) {
        return this.fileService.uploadMultipleFromManyFields((0, path_1.join)(__dirname, '..', '..', '..', 'storage', 'generic'), files);
    };
    __decorate([
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('singleFile')),
        (0, common_1.Post)('uploadSome'),
        __param(0, (0, common_1.UploadedFile)())
    ], FileController.prototype, "uploadSomeFile");
    __decorate([
        (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('multipleFiles')),
        (0, common_1.Post)('uploadMultiple'),
        __param(0, (0, common_1.UploadedFiles)())
    ], FileController.prototype, "uploadMultipleFiles");
    __decorate([
        (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
            {
                name: 'singleFile',
                maxCount: 1
            },
            {
                name: 'multipleFiles'
            },
        ])),
        (0, common_1.Post)('uploadMultipleFromManyFields'),
        __param(0, (0, common_1.UploadedFiles)())
    ], FileController.prototype, "uploadMultipleFromManyFields");
    FileController = __decorate([
        (0, common_1.Controller)('file')
    ], FileController);
    return FileController;
}());
exports.FileController = FileController;
