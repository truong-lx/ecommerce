import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storage } from './storage';
import path from 'path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        {
          name: 'files',
          maxCount: 10,
        },
      ],
      {
        dest: 'uploads/images',
        storage: storage,
        limits: {
          fieldSize: 1024 * 1024 * 5, //5mb
        },
        fileFilter(req, file, cb) {
          const extName = path.extname(file.originalname);
          if (['.jpg', '.png', '.gif'].includes(extName.toLowerCase())) {
            cb(null, true);
          } else {
            cb(new BadRequestException('Extend file not accept!'), false);
          }
        },
      },
    ),
  )
  upload(@UploadedFile() file: { file?: Express.Multer.File; files?: Express.Multer.File[] }) {
    return file?.file?.path;
  }
}
