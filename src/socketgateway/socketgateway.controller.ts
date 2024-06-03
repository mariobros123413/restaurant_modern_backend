import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { SocketgatewayService } from './socketgateway.service';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: true,
    namespace: '/comanda'
})
export class SocketGatewayController implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    constructor(private readonly messageWsService: SocketgatewayService) { }

    afterInit(server: Server) {
        console.log('Servidor WebSocket iniciado.');
    }

    handleConnection(client: Socket) {
        this.messageWsService.registerClient(client);
        console.log(`Cliente conectado: ${client.id}`);
        this.server.emit('clientes_conectados', this.messageWsService.getConnectedClients());
    }

    handleDisconnect(client: Socket) {
        this.messageWsService.removeClient(client.id);
        console.log(`Cliente desconectado: ${client.id}`);
        this.server.emit('clientes_conectados', this.messageWsService.getConnectedClients());
    }

    emitText(text: any) {
        this.server.emit('textConverted', { text });
        console.log("Texto emitido por socket:", text);
    }
}
