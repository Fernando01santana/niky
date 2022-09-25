import Address from './address.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('student')
export default class Students {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    enrollent_code:string

    @OneToOne(() => Address, address => address.id)
    @JoinColumn()
    address: Address

    @Column()
    phone:string;

    @Column()
    birth_day:Date;

    @Column({ type: 'real'})
    height: number;

    @Column({type:'real'})
    weight:number;

    @Column()
    type_student: string;

    @Column()
    classes: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

const typeStudent = {
    default: 'DEFAULT',
    monitor: 'MONITOR'
}