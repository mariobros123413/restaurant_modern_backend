import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoiceToTextModule } from './voice-to-text/voice-to-text.module';
import { MulterModule } from '@nestjs/platform-express';
import { SocketgatewayModule } from './socketgateway/socketgateway.module';

@Module({
  imports: [MulterModule.register({
    dest: './uploads', // Directorio donde se guardarán los archivos
  }), VoiceToTextModule, SocketgatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
