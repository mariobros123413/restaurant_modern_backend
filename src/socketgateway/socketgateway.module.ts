import { Module } from '@nestjs/common';
import { SocketGatewayController } from './socketgateway.controller';
import { SocketgatewayService } from './socketgateway.service';

@Module({
  providers: [SocketgatewayService, SocketGatewayController]
})
export class SocketgatewayModule {}
