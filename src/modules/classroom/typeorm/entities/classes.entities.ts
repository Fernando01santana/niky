import Instructor from "src/modules/instructor/typeorm/entities/instructor.entity";
import Students from "src/modules/student/typeorm/entities/students.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import TypeTask from "../../../typeTask/typeorm/entities/typeTask.entities";

@Entity('classes')
export default class Classes{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Instructor, (instructor) => instructor.classes)
    @JoinColumn({name:'instructor'})
    instructor: Instructor

    @ManyToMany(() => Students,{eager:true})
    @JoinTable()
    student: Students[]

    @OneToOne(() => TypeTask, typetask => typetask.id)
    typeTask: TypeTask

    @Column()
    qtde_student:string

    @Column()
    max_student:string

    @Column()
    hour_classroom:Date

    @Column()
    initial_date:Date

    @Column()
    final_date:Date

    @Column()
    class_duration:Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}