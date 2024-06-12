import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoiceToTextModule } from './voice-to-text/voice-to-text.module';
import { MulterModule } from '@nestjs/platform-express';
import { SocketgatewayModule } from './socketgateway/socketgateway.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pedido } from './entities/pedido.entity';
import { PedidoModule } from './pedido/pedido.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [MulterModule.register({
    dest: './uploads', // Directorio donde se guardarán los archivos
  }),
  ConfigModule.forRoot({
    isGlobal: true, // Hacer que las variables de configuración sean globales
    envFilePath: '.env', // Especificar el archivo de variables de entorno
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      const dbUrl = configService.get<string>('DATABASE_URL');
      console.log('DATABASE_URL:', dbUrl); // Log para verificar la URL
      return {
        type: 'postgres',
        url: dbUrl,
        entities: [pedido],
        synchronize: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false, // Esto ignora la validación del certificado, asegúrate de revisar si necesitas una configuración más segura
        },
      };
    },
    inject: [ConfigService],
  }),
    VoiceToTextModule,
    SocketgatewayModule,
    PedidoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
// host: 'localhost',
// port: 5432,
// password: '2025',
// username: 'postgres',
// entities: [pedido],
// database: 'restaurante',