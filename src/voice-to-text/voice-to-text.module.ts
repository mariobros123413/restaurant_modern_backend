import { Module } from '@nestjs/common';
import { VoiceToTextController } from './voice-to-text.controller';
import { VoiceToTextService } from './voice-to-text.service';
import { SocketGatewayController } from '../socketgateway/socketgateway.controller';
import { SocketgatewayService } from 'src/socketgateway/socketgateway.service';

@Module({
  controllers: [VoiceToTextController],
  providers: [VoiceToTextService, SocketGatewayController, SocketgatewayService], // Aquí aseguras que SocketGateway está como provider
})
export class VoiceToTextModule {}
