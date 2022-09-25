import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Contact from "src/modules/instructor/typeorm/entities/contact.entity";
import Address from "src/modules/student/typeorm/entities/address.entity";
import { Repository } from "typeorm";
import { CreateInstructorDto } from "../dto/create-instructor.dto";
import { UpdatedInstructorDto } from "../dto/instructor-updated.dto";
import Instructor from "../typeorm/entities/instructor.entity";

@Injectable()
export default class InstructorService{
    constructor(
        @InjectRepository(Instructor)
        private instructorRepositorie:Repository<Instructor>,
        @InjectRepository(Contact) 
        private  contactRepositorie:Repository<Contact>,
        @InjectRepository(Address) 
        private  addressRepositorie:Repository<Address>,
    ){}

    async create(createInstructor:CreateInstructorDto):Promise<Instructor>{
        const address = await this.addressRepositorie.save(createInstructor.address)
        const createContact = await this.contactRepositorie.save({phone:createInstructor.contact})

        const instructorData:any = {
            address:address,
            document:createInstructor.document,
            name:createInstructor.name,
            title:createInstructor.title,
            contact:createContact
        }
        
        const instructor = await this.instructorRepositorie.save(instructorData)
        return instructor
        }

        async findAll():Promise<Instructor[]>{
            return this.instructorRepositorie.find()
        }

        async findOne(id:string):Promise<Instructor>{
            const students = await this.instructorRepositorie.findBy({id:id})
            if (!students) {
                throw new BadRequestException("Instrutor especificado nao encontrado");
            }
            return students[0]
        }

        async update(updatedInstructor:UpdatedInstructorDto):Promise<Instructor>{
            const searchInstructor = await this.instructorRepositorie.findBy({id:updatedInstructor.id})
            if (!searchInstructor[0]?.id) {
                throw new BadRequestException('Nenhum instrutor encontrado')
            }

        const address = await this.addressRepositorie.save(updatedInstructor.data.address)
        const createContact = await this.contactRepositorie.save({phone:updatedInstructor.data.contact})

        searchInstructor[0].address = address
        searchInstructor[0].contact = createContact
        searchInstructor[0].document = updatedInstructor.data.document
        searchInstructor[0].name = updatedInstructor.data.name
        searchInstructor[0].title = updatedInstructor.data.title

        return  this.instructorRepositorie.save(searchInstructor[0])

        }

        async remove(id:string):Promise<void>{
            const instructor = await this.instructorRepositorie.findBy({id:id})
            await this.instructorRepositorie.remove(instructor)
            return
        }

        async vinculeInstructorToClass(idInstructor:String,idClass:String):Promise<void>{}
    }
