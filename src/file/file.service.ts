import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async uploadFile(path: string, file: Express.Multer.File) {
    try {
      await writeFile(path, file.buffer);
    } catch (e) {
      throw new Error(`Couldnt write file. Error: ${e}`);
    }
    return true;
  }
}
