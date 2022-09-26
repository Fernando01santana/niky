import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Instructor from "src/modules/instructor/typeorm/entities/instructor.entity";
import Students from "src/modules/student/typeorm/entities/students.entity";
import TypeTask from "src/modules/typeTask/typeorm/entities/typeTask.entities";
import { Repository } from "typeorm";
import { CreateClassroomtDto } from "../interface/class.interface";
import Classes from "../typeorm/entities/classes.entities";
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import { UpdateClasses } from "../dto/update-classes.dto";
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
        const searchTypeTask = await this.typetaskRepositorie.findBy({name:createClass.typeTask})
        
        if (!instructor.length) {
            throw new BadRequestException("Instrutor nao encontrado");
        }

        if (!searchTypeTask.length) {
            throw new BadRequestException("Tipo de atividade nao encontrado");
        }

        const hourClassroon = this.formatterDate(new Date(createClass.hourClassroom))
        const classDuration = this.formatterDate(new Date(createClass.classDuration))
        const classe = {
            class_duration: classDuration,
            final_date: new Date(createClass.finalDate),
            hour_classroom: hourClassroon,
            initial_date: new Date(createClass.initialDate),
            instructor:instructor[0],
            max_student:createClass.maxStudent,
            qtde_student:createClass.qtdeStudent,
            student:null,
            typeTask:searchTypeTask[0],
        }
        
        const classeCreated = await this.classesRepositorie.save(classe)
        return classeCreated
    }

    async findAll():Promise<Classes[]>{
        const classes = await this.classesRepositorie.find({
            relations: {
                student: true,
            },
        })
        return classes
    }

    async update(updatedClasses:UpdateClasses):Promise<Classes>{
        const instructor = await this.instructorRepositorie.findBy({id:String(updatedClasses.data.instructor)})
        const searchTypeTask = await this.typetaskRepositorie.findBy({name:String(updatedClasses.data.typeTask)})
        
        if (!instructor.length) {
            throw new BadRequestException("Instrutor nao encontrado");
        }

        if (!searchTypeTask.length) {
            throw new BadRequestException("Tipo de atividade nao encontrado");
        }
        const hourClassroon = this.formatterDate(new Date(String(updatedClasses.data.hourClassroom)))
        const classDuration = this.formatterDate(new Date(String(updatedClasses.data.classDuration)))
        const classe = {
            class_duration: classDuration,
            final_date: new Date(String(updatedClasses.data.finalDate)),
            hour_classroom: hourClassroon,
            initial_date: new Date(String(updatedClasses.data.initialDate)),
            instructor:instructor[0],
            max_student:String(updatedClasses.data.masStudent),
            qtde_student:String(updatedClasses.data.qtdeStudent),
            student:null,
            typeTask:searchTypeTask[0],
        }
        
        const classUpdate = await this.classesRepositorie.save(classe)
        return classUpdate
    }

    async findByInstructor(idStructor:string):Promise<Classes[]>{
        const instructor = await this.instructorRepositorie.findBy({id:idStructor})
        if (!instructor.length) {
            throw new BadRequestException("Instrutor nao encontrado");
        }
        const classes = await this.classesRepositorie.find({where:{instructor:instructor}})
        return classes
    }

    async remove(id:string):Promise<void>{
        const classe = await this.classesRepositorie.findBy({id:id})
        await this.classesRepositorie.remove(classe)
        return
    }

    formatterDate(data:Date){
        const timeZone = 'Brazil/East'
        const zonedDate = utcToZonedTime(data, timeZone)
        const pattern = 'yyyy.M.d HH:mm:ss.SSS \'GMT\''
        const output = format(zonedDate, pattern, { timeZone: 'Brazil/East' })
        return output
    }
}