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
import TypeStudant from './typeStudant';
import Contact from 'src/modules/contact/typeorm/entities/contact.entity';

@Entity('student')
export default class Students {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    enrollent_code:number

    @OneToOne(() => Address, address => address.id)
    @JoinColumn({name:'address'})
    address: Address

    @OneToOne(() => Contact, contact => contact.id)
    @JoinColumn({name:'contact'})
    contact:Contact;

    @Column()
    birth_day:Date;

    @Column({ type: 'real'})
    height: number;

    @Column({type:'real'})
    weight:number;

    @OneToOne(() => TypeStudant, typeStudant => typeStudant.id)
    @JoinColumn({name:'type_student'})
    type_student: TypeStudant;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
