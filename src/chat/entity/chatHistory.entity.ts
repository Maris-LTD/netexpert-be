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

    @Column('json', {default: []})
    devices: any;

    @Column('json', {default: []}) 
    blogs: any;

    @Column('json', {default: []})
    networks: any;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @Column({nullable: false, default: false})
    is_ai_response: boolean;
}