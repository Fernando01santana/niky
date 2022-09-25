import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdatedStudentDto } from "../dto/update-student";
import StudentService from "../services/student.service";


@Controller('students')
export class StudentController{
    constructor(private  studentService:StudentService){}

    @Post('create')
    async create(@Body() createStudent:CreateStudentDto):Promise<any>{
        const result = await this.studentService.create(createStudent)
        return result
    }

    @Post('update')
    async update(@Body() updatedStudent:UpdatedStudentDto):Promise<any>{
        const result = await this.studentService.update(updatedStudent)
        console.log(result);
        return result
    }
}