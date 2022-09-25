import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Instructor from "src/modules/instructor/typeorm/entities/instructor.entity";
import Students from "src/modules/student/typeorm/entities/students.entity";
import { Repository } from "typeorm";
import { CreateStudentDto } from "../interface/class.interface";
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
    ){}

    async create(createClass:CreateStudentDto):Promise<Classes>{
        return this.classesRepositorie.save(createClass)
    }
}