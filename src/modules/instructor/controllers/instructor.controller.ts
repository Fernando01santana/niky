import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateInstructorDto } from "../dto/create-instructor.dto";
import InstructorService from "../service/instructor.service";



@Controller('instructor')
export class InstructorController{
    constructor(private  instructorService:InstructorService){}

    @Post('create')
    async create(@Body() createInstructor:CreateInstructorDto):Promise<any>{
        const result = await this.instructorService.create(createInstructor)
        return result
    }
}