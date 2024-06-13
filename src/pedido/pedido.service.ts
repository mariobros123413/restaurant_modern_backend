import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; import { Repository } from 'typeorm';
import { pedido } from '../entities/pedido.entity';
@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(pedido)
        private pedidoRepository: Repository<pedido>
    ) { }

    async crearPedido(id_mesero: number, nro_mesa: number, nombre_comensal: string, plato: string, bebida: string, extras: string, fecha: string) {
        try {
            const pedidoc = this.pedidoRepository.create({ id_mesero, nro_mesa, nombre_comensal, fecha: fecha, hora: new Date().toLocaleTimeString(), estado: false, plato, bebida, extras });
            await this.pedidoRepository.save(pedidoc);
            return 'success';
        } catch (error) {
            throw new NotFoundException(`Error al crear el pedido: ` + error);

        }
    }
    async crearMuchosPedidos(pedidos: Array<{ id_mesero: number, nro_mesa: number, nombre_comensal: string, fecha: string, hora: string, plato: string, bebida: string, extras: string }>) {
        try {
            const pedidosCreados = [];
            for (const pedido of pedidos) {
                const { id_mesero, nro_mesa, nombre_comensal, fecha, hora, plato, bebida, extras } = pedido;
                const pedidoc = this.pedidoRepository.create({ id_mesero: 1, nro_mesa, nombre_comensal, fecha: fecha, hora: hora, estado: false, plato, bebida, extras });
                const pedidoGuardado = await this.pedidoRepository.save(pedidoc);
                pedidosCreados.push(pedidoGuardado);
            }
            return pedidosCreados;
        } catch (error) {
            throw new NotFoundException(`Error al crear los pedidos: ` + error);
        }
    }
    async getPedidos() {
        try {
            let pedidos = await this.pedidoRepository.find();
            return pedidos;
        } catch (error) {
            throw new NotFoundException(`Error al obtener los pedidos`);

        }
    }

    async deletePedido(nro_pedido) {
        try {
            const pedidoExistente = await this.pedidoRepository.findOne({ where: { nro_pedido: nro_pedido } });
            if (!pedidoExistente) {
                throw new NotFoundException(`Pedido no existe en la lista.`);
            }
            this.pedidoRepository.remove(pedidoExistente);
        } catch (error) {
            throw new NotFoundException(`Ocurrió algún error inesperado : ${error.message}.`);
        }
    }

    async updatePedido(nro_pedido, nuevoEstado: boolean) {
        try {
            const pedidoExistente = await this.pedidoRepository.findOne({ where: { nro_pedido: nro_pedido } });
            if (!pedidoExistente) {
                throw new NotFoundException(`Pedido no existe en la lista.`);
            }
            pedidoExistente.estado = nuevoEstado; // Asignar el nuevo estado aquí

            // Guardar el pedido actualizado
            await this.pedidoRepository.save(pedidoExistente);
        } catch (error) {
            throw new NotFoundException(`Ocurrió algún error inesperado : ${error.message}.`);
        }
    }
}
