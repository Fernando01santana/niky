import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
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

    @Post('find')
    async findAll():Promise<any>{
        const result = await this.studentService.findAll()
        console.log(result);
        return result
    }

    @Get('find/one')
    async findOne(@Query() id:string):Promise<any>{
        const result = await this.studentService.findOne(id)
        return result
    }

    @Get('findByTypeStudent')
    async findByTypeStudent(@Query() typeStudent:string):Promise<any>{
        const result = await this.studentService.findByTypeStudent(typeStudent)
        return result
    }

    @Get('find/students/Class')
    async findStudantsByClass(@Query() classId:string):Promise<any>{
        const result = await this.studentService.findStudantsByClass(classId)
        return result
    }

    @Delete('remove')
    async remove(@Query() id:string):Promise<void>{
        const result = await this.studentService.remove(id)
        return result
    }
}