import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus, Body, Get , Inject} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VoiceToTextService } from './voice-to-text.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SocketGatewayController } from '../socketgateway/socketgateway.controller';
@Controller('voice-to-text')
export class VoiceToTextController {
    constructor(private readonly voiceToTextService: VoiceToTextService, private socketGateway : SocketGatewayController
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const extension = extname(file.originalname);
                callback(null, `${uniqueSuffix}${extension}`);
            }
        })
    }))
    async uploadFileAndConvertToText(@UploadedFile() file: Express.Multer.File): Promise<any> {
        if (!file) {
            throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const text = await this.voiceToTextService.convertAudioToText(file);
            this.socketGateway.emitText(text);
            return text;
        } catch (error) {
            throw new HttpException('Error processing file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('json')
    async textotojson(@Body() body: any): Promise<any> {

        console.log(` video create time : ${JSON.stringify(body)}`);
        const text = await this.voiceToTextService.texttojson(body.texto);
        console.log("SE EJECUTO HOLA");
        return text;
    }

    @Get('hola')
    async hola(): Promise<string> {
        return 'hola';
    }
}
