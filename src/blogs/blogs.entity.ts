import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('blogs')
export class Blog {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    title: string;

    @Column()
    thumbnail: string;

    @Column()
    content: string;

    @Column()
    category: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}