import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan, Between } from 'typeorm';
import { pedido } from '../entities/pedido.entity';
@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(pedido)
        private pedidoRepository: Repository<pedido>
    ) { }
    private platos = [
        { cantidad: 1, nombre: 'Pollo' },
        { cantidad: 1, nombre: 'Hamburguesa' },
        { cantidad: 1, nombre: 'Sopa de fideo' },
        { cantidad: 1, nombre: 'Sopa de Arroz' },
        { cantidad: 2, nombre: 'Ensalada mixta' },
        { cantidad: 1, nombre: 'Patatas frita' },
        { cantidad: 2, nombre: 'Escabeche' },
        { cantidad: 1, nombre: 'Estofado de fideo' },
        { cantidad: 1, nombre: 'Macarrones con queso' },
        { cantidad: 2, nombre: 'Pollo al jugo' }
    ];

    private bebidas = [
        { cantidad: 1, nombre: 'Agua mineral' },
        { cantidad: 1, nombre: 'zumo de naranja' },
        { cantidad: 2, nombre: 'coca cola 2l' },
        { cantidad: 1, nombre: 'Limonada' },
        { cantidad: 2, nombre: 'Michelada' },
        { cantidad: 1, nombre: 'Cerveza artesanal' },
        { cantidad: 2, nombre: 'Vino blanco' },
        { cantidad: 1, nombre: 'Margarita' }
    ];

    private nro_mesa = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
    ]

    private nombre_comensal = ['Carlos Martínez',
        'Ana Gómez',
        'Pedro López',
        'María Fernández',
        'Juan González',
        'Laura Sánchez',
        'Luis Ramírez',
        'Elena Pérez',
        'Miguel Torres',
        'Carmen Díaz',
        'José Morales',
        'Alicia Vargas',
        'Rafael Cruz',
        'Patricia Rojas',
        'David Castillo',
        'Marta Herrera',
        'Jorge Moreno',
        'Teresa Flores',
        'Sergio Jiménez',
        'Silvia Ruiz',
        'Andrés Navarro',
        'Sonia Medina',
        'Alberto Ortega',
        'Irene Castro',
        'Francisco León',
        'Gloria Suárez',
        'Eduardo Paredes',
        'Lorena Romero',
        'Javier Serrano',
        'Beatriz Mendoza'
    ]
    private fechas = [
        '04/01/2024', '04/02/2024', '04/03/2024', '04/04/2024', '04/05/2024', '04/06/2024', '04/07/2024', '04/08/2024', '04/09/2024', '04/10/2024',
        '04/11/2024', '04/12/2024', '04/13/2024', '04/14/2024', '04/15/2024', '04/16/2024', '04/17/2024', '04/18/2024', '04/19/2024', '04/20/2024',
        '04/21/2024', '04/22/2024', '04/23/2024', '04/24/2024', '04/25/2024', '04/26/2024', '04/27/2024', '04/28/2024', '04/29/2024', '04/30/2024',
        '05/01/2024', '05/02/2024', '05/03/2024', '05/04/2024', '05/05/2024', '05/06/2024', '05/07/2024', '05/08/2024', '05/09/2024', '05/10/2024',
        '05/11/2024', '05/12/2024', '05/13/2024', '05/14/2024', '05/15/2024', '05/16/2024', '05/17/2024', '05/18/2024', '05/19/2024', '05/20/2024',
        '05/21/2024', '05/22/2024', '05/23/2024', '05/24/2024', '05/25/2024', '05/26/2024', '05/27/2024', '05/28/2024', '05/29/2024', '05/30/2024',
        '05/31/2024'
    ];
    private horas = [
        '12:00:00 a.m.', '12:30:00 a.m.', '01:00:00 a.m.', '01:30:00 a.m.', '02:00:00 a.m.', '02:30:00 a.m.', '03:00:00 a.m.', '03:30:00 a.m.',
        '04:00:00 a.m.', '04:30:00 a.m.', '05:00:00 a.m.', '05:30:00 a.m.', '06:00:00 a.m.', '06:30:00 a.m.', '07:00:00 a.m.', '07:30:00 a.m.',
        '08:00:00 a.m.', '08:30:00 a.m.', '09:00:00 a.m.', '09:30:00 a.m.', '10:00:00 a.m.', '10:30:00 a.m.', '11:00:00 a.m.', '11:30:00 a.m.',
        '12:00:00 p.m.', '12:30:00 p.m.', '01:00:00 p.m.', '01:30:00 p.m.', '02:00:00 p.m.', '02:30:00 p.m.', '03:00:00 p.m.', '03:30:00 p.m.',
        '04:00:00 p.m.', '04:30:00 p.m.', '05:00:00 p.m.', '05:30:00 p.m.', '06:00:00 p.m.', '06:30:00 p.m.', '07:00:00 p.m.', '07:30:00 p.m.',
        '08:00:00 p.m.', '08:30:00 p.m.', '09:00:00 p.m.', '09:30:00 p.m.', '10:00:00 p.m.', '10:30:00 p.m.', '11:00:00 p.m.', '11:30:00 p.m.'
    ];
    private extras = [
        "Más servilletas",
        "Extra ketchup",
        "Sin cebolla",
        "Extra salsa picante",
        "Sin sal",
        "Más hielo",
        "Adicional de queso",
        "Extra limón",
        "Más pan",
        "Extra mostaza",
        "Sin ajo",
        "Salsa aparte",
        "Sin gluten",
        "Vegetariano",
        "Sin lactosa",
        "Extra carne",
        "Poco picante",
        "Adicional de aguacate",
        "Extra tocineta",
        "Sin cilantro"
    ];



    async crearPedido(id_mesero: number, nro_mesa: number, nombre_comensal: string, plato: string, bebida: string, extras: string, fecha: string) {
        try {
            const pedidoc = this.pedidoRepository.create({ id_mesero, nro_mesa, nombre_comensal, fecha: fecha, hora: new Date().toLocaleTimeString(), estado: false, plato, bebida, extras });
            await this.pedidoRepository.save(pedidoc);
            return 'success';
        } catch (error) {
            throw new NotFoundException(`Error al crear el pedido: ` + error);

        }
    }
    async crearMuchosPedidosx(pedidos: Array<{ id_mesero: number, nro_mesa: number, nombre_comensal: string, fecha: string, hora: string, plato: string, bebida: string, extras: string }>) {
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



    private getRandomItem(items: any[]): any {
        return items[Math.floor(Math.random() * items.length)];
    }
    private formatItem(item: { cantidad: number, nombre: string }): string {
        return `{cantidad: ${item.cantidad}, nombre: ${item.nombre}}`;
    }
    async crearMuchosPedidos(cant: number) {
        try {
            const pedidosCreados = [];
            var i = 1;
            while (i <= cant) {
                const plato = this.getRandomItem(this.platos);
                const bebida = this.getRandomItem(this.bebidas);
                const platoString = `[${this.formatItem(plato)}]`;
                const bebidaString = `[${this.formatItem(bebida)}]`;
                const nro_mesa = this.getRandomItem(this.nro_mesa);
                const nombre_comensal = this.getRandomItem(this.nombre_comensal);
                const fecha = this.getRandomItem(this.fechas);
                const hora = this.getRandomItem(this.horas);
                const extras = this.getRandomItem(this.extras);
                const pedidoc = this.pedidoRepository.create({
                    id_mesero: 1,
                    nro_mesa,
                    nombre_comensal,
                    fecha,
                    hora,
                    estado: false,
                    plato: platoString,
                    bebida: bebidaString,
                    extras
                });
                const pedidoGuardado = await this.pedidoRepository.save(pedidoc);
                pedidosCreados.push(pedidoGuardado);
                i++;
            }
        }
        catch (error) {
            throw new NotFoundException(`Error al crear los pedidos: ` + error);
        }
    }


    async getPedidos(page: number, size: number): Promise<{ data: pedido[]; paginaInfo: PaginaInfo }> {
        const [pedidos, total] = await this.pedidoRepository.findAndCount({
            order: { nro_pedido: 'ASC' },
            skip: page * size,
            take: size,
        });
        const paginaInfo: PaginaInfo = {
            totalPaginas: Math.ceil(total / size)-1,
            totalElementos: total,
            paginaActual: page,
            pageSize: size,
        };

        return { data: pedidos, paginaInfo };
    }

    async deletePedido(nro_pedido: number) {
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

    async updatePedido(nro_pedido: number, nuevoEstado: boolean) {
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
interface PaginaInfo {
    totalPaginas: number;
    totalElementos: number;
    paginaActual: number;
    pageSize: number;
}