import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  async uploadFile(path: string, file: Express.Multer.File) {
    try {
      await writeFile(path, file.buffer);
    } catch (e) {
      throw new Error(`Couldnt write file. Error: ${e}`);
    }
    return { success: true };
  }

  async uploadMultipleFiles(basePath, files: Express.Multer.File[]) {
    try {
      for (const file of files) {
        await writeFile(join(basePath, `${file.originalname}`), file.buffer);
      }
    } catch (e) {
      throw new Error(`Couldnt write file. Error: ${e}`);
    }
    return { success: true };
  }

  async uploadMultipleFromManyFields(
    basePath,
    files: {
      singleFile: Express.Multer.File[];
      multipleFiles: Express.Multer.File[];
    },
  ) {
    await this.uploadFile(
      join(basePath, files.singleFile[0].originalname),
      files.singleFile[0],
    );
    await this.uploadMultipleFiles(basePath, files.multipleFiles);
    return { success: true };
  }
}
