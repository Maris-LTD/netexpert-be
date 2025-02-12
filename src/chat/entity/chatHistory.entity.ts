import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('chat_history')
export class ChatMessage {
    @PrimaryColumn('int8')
    id: number

    @Column({nullable: true})
    message: string;

    @Column({nullable: true})
    user_id: string;

    @Column({nullable: true})
    session_id: string;

    @Column({nullable: false})
    conversation_id: string;

    @Column('json')
    devices: any;

    @Column('json')
    blogs: any;

    @Column('json')
    networks: any;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    create_at: Date
}