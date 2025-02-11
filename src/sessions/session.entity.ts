import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({nullable: false, unique: true})
    session_token: string;
}
