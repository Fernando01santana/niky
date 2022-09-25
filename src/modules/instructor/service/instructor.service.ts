import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Contact from "src/modules/contact/typeorm/entities/contact.entity";
import Address from "src/modules/student/typeorm/entities/address.entity";
import { Repository } from "typeorm";
import { CreateInstructorDto } from "../dto/create-instructor.dto";
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
    }
