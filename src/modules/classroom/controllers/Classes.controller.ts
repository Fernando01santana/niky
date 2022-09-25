import { Body, Controller, Get, Post } from "@nestjs/common"
import { CreateClassesDto } from "../dto/create-classes.dto"
import { CreateClassroomtDto } from "../interface/class.interface"
import ClassroomService from "../services/classroom.service"

@Controller('classroom')
export class ClassroomController{
    constructor(private  classesService:ClassroomService){}

    @Post('create')
    async create(@Body() createClassesDto:CreateClassroomtDto):Promise<any>{
        const result = await this.classesService.create(createClassesDto)
        return result
    }

    @Get('find')
    async findAll():Promise<any>{
        const result = await this.classesService.findAll()
        return result
    }
}