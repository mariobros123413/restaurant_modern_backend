import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class pedido {
    @PrimaryGeneratedColumn()
    nro_pedido: number;

    @Column()
    id_mesero: number;

    @Column()
    nro_mesa: number;

    @Column()
    nombre_comensal: string;

    @Column()
    fecha: string;

    @Column({nullable : true})
    hora: string;

    @Column()
    estado: boolean;

    @Column()
    plato: string;

    @Column()
    bebida: string;

    @Column()
    extras: string;
}
