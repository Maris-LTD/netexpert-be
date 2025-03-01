import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('conversations')
export class Conversation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    session_id: string;

    @Column({type: 'timestamp', default: ()=>'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({ nullable: true })
    name: string;
}