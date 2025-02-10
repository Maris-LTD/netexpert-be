import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({nullable: false ,default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({nullable: true ,default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date;
}
