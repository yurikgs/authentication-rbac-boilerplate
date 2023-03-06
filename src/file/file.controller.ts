import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { FileService } from './file.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Request } from 'express';
import * as util from 'util';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  // watch out - FileInterceptor field name represents html inut tag 'name' attribute
  @UseInterceptors(FileInterceptor('singleFile'))
  @Post('uploadSome')
  uploadSomeFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(
      join(
        __dirname,
        '..',
        '..',
        '..',
        'storage',
        'generic',
        `${file.originalname}`,
      ),
      file,
    );
  }

  @UseInterceptors(FilesInterceptor('multipleFiles'))
  @Post('uploadMultiple')
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadMultipleFiles(
      join(__dirname, '..', '..', '..', 'storage', 'generic'),
      files,
    );
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'singleFile',
        maxCount: 1,
      },
      {
        name: 'multipleFiles',
      },
    ]),
  )
  @Post('uploadMultipleFromManyFields')
  uploadMultipleFromManyFields(
    @UploadedFiles()
    files: {
      singleFile: Express.Multer.File[];
      multipleFiles: Express.Multer.File[];
    },
  ) {
    return this.fileService.uploadMultipleFromManyFields(
      join(__dirname, '..', '..', '..', 'storage', 'generic'),
      files,
    );
  }
}
