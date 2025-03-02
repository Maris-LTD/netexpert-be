import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('location')
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string;
}