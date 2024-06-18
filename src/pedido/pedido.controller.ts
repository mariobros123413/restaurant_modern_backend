import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
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
    async crearMuchosPedidos(@Body() body: any): Promise<any> {
        try {
            const pedidosCreados = await this.pedidoService.crearMuchosPedidos(body.cant);
            return pedidosCreados;
        } catch (error) {
            throw new NotFoundException('No se pudieron crear los pedidos: ' + error);
        }
    }

    @Get()
    async getPedidos(@Query('page') page: number, @Query('size') size: number): Promise<any> {
        try {
            return await this.pedidoService.getPedidos(page, size);
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
