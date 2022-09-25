import { BadRequestException, Injectable, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Contact from "src/modules/contact/typeorm/entities/contact.entity";
import { DataSource, Repository } from "typeorm";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdatedStudentDto } from "../dto/update-student";
import { typeStudent } from "../interface/student.interface";
import Address from "../typeorm/entities/address.entity";
import Students from "../typeorm/entities/students.entity";
import TypeStudant from "../typeorm/entities/typeStudant";


@Injectable()
export default class StudentService {
constructor(
    @InjectRepository(Students) 
    private  studentRepositorie:Repository<Students>,
    @InjectRepository(Address) 
    private  addressRepositorie:Repository<Address>,
    @InjectRepository(TypeStudant) 
    private  typeStudantRepositorie:Repository<TypeStudant>,
    @InjectRepository(Contact) 
    private  contactRepositorie:Repository<Contact>,
    ){}

    async create(createStudent: CreateStudentDto):Promise<Students>{
        const { address, birth_day, classes, height, name, phone, type_student, weight } = createStudent
        try {
            
            const typeStudant = await this.typeStudantRepositorie.findBy({name:type_student})
            if (!typeStudant) {
                throw new BadRequestException('Tipo de estudante informado inexistente')
            }

            //tentar adicionar transaction
            const contact = await this.contactRepositorie.save({phone:createStudent.phone})
            const createAddress = await this.addressRepositorie.save(address)
            const student = {
                name: name,
                enrollent_code:1,
                address:createAddress,
                contact: contact,
                birth_day: new Date(birth_day),
                height: height,
                weight: weight,
                type_student: typeStudant[0],
                classes: 1,
            }

            const studentCreated = await this.studentRepositorie.save(student)
            return studentCreated
        } catch (error) {
            console.log(error);
            
            throw new BadRequestException(error)
        }
    }

    async update(updatedStudent:UpdatedStudentDto):Promise<any>{
        // const student = await this.studentRepositorie.findBy({id:updatedStudent.id})
        // if (student) {
        //     throw new Error('Nenhum aluno encontrado!')
        // }
        const address = await this.addressRepositorie.findBy(updatedStudent.data.address)
        console.log(address);
        
        if(!address){
            const adressSave = await this.addressRepositorie.save(updatedStudent.data.address)
            updatedStudent.data.address = adressSave
        }
        const studentUpdate = await this.studentRepositorie.findBy({id:updatedStudent.id})
        studentUpdate[0].address = address[0]

    //    const studentUpdate =  await this.studentRepositorie.update({id:updatedStudent.id},updatedStudent.data)
       console.log(studentUpdate);
       
       return studentUpdate

    }

    searchLevelCess(level_acess) {
        let acessLevelSave = null;
        for (const key in typeStudent) {
          if (Object.prototype.hasOwnProperty.call(typeStudent, key)) {
            const element = typeStudent[key];
            if (element === level_acess) {
                acessLevelSave = element
            }
          }
        }
        return acessLevelSave;
      }
}
