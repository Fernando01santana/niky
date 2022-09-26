import Students from "src/modules/student/typeorm/entities/students.entity";
import { Column, CreateDateColumn, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('enrollment')
export default class Enrollment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Students,{eager:true,nullable:true})
    @JoinTable()
    student: Students[]

    @Column()
    enrollment_code:number

    @Column()
    present:boolean

    @Column()
    frequency_day:Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}