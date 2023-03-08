import { BadRequestException } from '@nestjs/common';

export const imageMimeToExtension = (mimetype: string) => {
  if (!(mimetype == 'image/jpeg' || mimetype == 'image/png')) {
    throw new BadRequestException(
      'Invalid Format. Please send a valid image jpeg/png file',
    );
  }
  const extension = mimetype.split('image/')[1];
  return extension;
};
