import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
    constructor(
        private pedidoService: PedidoService
    ) { }

    @Post()
    async crearPedido(@Body() body: any): Promise<any> {
        try {
            const pedido = await this.pedidoService.crearPedido(body.id_mesero, body.nro_mesa, body.nombre_comensal, body.plato, body.bebida, body.extras, body.fecha);
            return pedido;
        } catch (error
        ) {
            throw new NotFoundException('No se pudo crear el pedido : ' + error);
        }
    }
    @Post('crear-muchos')
    async crearMuchosPedidos(@Body() pedidos: Array<{ id_mesero: number, nro_mesa: number, nombre_comensal: string, fecha: string, hora: string, plato: string, bebida: string, extras: string }>): Promise<any> {
        try {
            const pedidosCreados = await this.pedidoService.crearMuchosPedidos(pedidos);
            return pedidosCreados;
        } catch (error) {
            throw new NotFoundException('No se pudieron crear los pedidos: ' + error);
        }
    }
    @Get()
    async getPedidos() {
        try {
            const pedidos = await this.pedidoService.getPedidos();
            return pedidos;
        } catch (error) {
            throw new NotFoundException('No se pudo obtener los pedidos');
        }
    }

    @Delete(':nro')
    async eliminarPedido(@Param('nro') nro: number): Promise<any> {
        try {
            const pedidos = await this.pedidoService.deletePedido(nro);
            return pedidos;
        } catch (error) {
            throw new NotFoundException('No se pudo obtener los pedidos');
        }
    }

    @Put(':nro')
    async updatePedido(@Param('nro') nro: number, @Body('estado') nuevoEstado: boolean,
    ): Promise<any> {
        try {
            const pedidos = await this.pedidoService.updatePedido(nro, nuevoEstado);
            return pedidos;
        } catch (error) {
            throw new NotFoundException('No se pudo obtener los pedidos');
        }
    }
}
