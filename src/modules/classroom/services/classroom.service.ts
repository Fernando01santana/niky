import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Instructor from "src/modules/instructor/typeorm/entities/instructor.entity";
import Students from "src/modules/student/typeorm/entities/students.entity";
import TypeTask from "src/modules/typeTask/typeorm/entities/typeTask.entities";
import { Repository } from "typeorm";
import { CreateClassroomtDto } from "../interface/class.interface";
import Classes from "../typeorm/entities/classes.entities";

@Injectable()
export default class ClassroomService{
    constructor(
    @InjectRepository(Students) 
    private  studentRepositorie:Repository<Students>,
    @InjectRepository(Instructor) 
    private  instructorRepositorie:Repository<Instructor>,
    @InjectRepository(Classes) 
    private  classesRepositorie:Repository<Classes>,
    @InjectRepository(TypeTask) 
    private  typetaskRepositorie:Repository<TypeTask>,
    ){}

    async create(createClass:CreateClassroomtDto):Promise<Classes>{
        const instructor = await this.instructorRepositorie.findBy({id:createClass.instructor})
        if (!instructor[0].id) {
            throw new BadRequestException("Instrutor nao encontrado");
        }

        const typeTask = await this.typetaskRepositorie.findBy({name:createClass.typeTask})
        if (!typeTask[0].id) {
            throw new BadRequestException("Tipo de atividade nao encontrado");
        }
        const classe = {
            class_duration:new Date(createClass.classDuration),
            final_date: new Date(createClass.finalDate),
            hour_classroom:new Date(createClass.hourClassroom),
            initial_date:new Date(createClass.initialDate),
            instructor:instructor[0],
            max_student:Number(createClass.maxStudent),
            qtde_student:Number(createClass.qtdeStudent),
            student:null,
            typeTask:typeTask[0],
        }
        const classeCreated = await this.classesRepositorie.save(classe)
        return classeCreated
    }

    async findAll():Promise<Classes[]>{
        return this.classesRepositorie.find()
    }
}