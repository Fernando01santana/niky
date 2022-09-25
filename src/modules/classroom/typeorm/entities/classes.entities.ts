import Instructor from "src/modules/instructor/typeorm/entities/instructor.entity";
import Students from "src/modules/student/typeorm/entities/students.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import TypeTask from "./typeTask.entities";

@Entity('classes')
export default class Classes{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Instructor, (instructor) => instructor.classes)
    instructor: Instructor

    @ManyToMany(() => Students)
    @JoinTable()
    student: Students[]

    @OneToOne(() => TypeTask, typetask => typetask.id)
    @JoinColumn()
    typeTask: TypeTask

    @Column()
    qtde_student:number

    @Column()
    max_student:number

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