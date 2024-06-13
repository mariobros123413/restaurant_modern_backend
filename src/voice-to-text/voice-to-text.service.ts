import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as fs from 'fs';

@Injectable()
export class VoiceToTextService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: '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',
        });
    }

    async convertAudioToText(file: Express.Multer.File): Promise<any> {

        const filePath = file.path; // path donde Multer guardó el archivo
        console.log("path : " + filePath);
        try {
            const transcription = await this.openai.audio.transcriptions.create({
                file: fs.createReadStream(filePath),
                model: "whisper-1",
            });

            // Opcional: eliminar el archivo después de procesar
            fs.unlinkSync(filePath);
            console.log("---------------" + transcription.text);
            const jsontext = this.texttojson(transcription.text);

            return jsontext; // Asegúrate de acceder correctamente a la propiedad donde se encuentra el texto
        } catch (error) {
            console.error('Error processing audio file:', error);
            throw new Error('Failed to convert audio to text');
        }
    }

    async texttojson(text: string): Promise<any> {
        const openai = new OpenAI({
            apiKey: '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',
        });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You will be provided with unstructured data from a restaurant order and your task will be to analyze it and create a json with: number_table(integer), customer_name(string), dishes (amount, name), drinks (amount, name) and extras(simple string). verbs in the singular always"
                },
                {
                    "role": "user",
                    "content": text
                }
            ]
        });
        return response.choices[0].message.content;
    }
}
