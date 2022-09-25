import { BadRequestException, Injectable, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdatedStudentDto } from "../dto/update-student";
import { typeStudent } from "../interface/student.interface";
import Address from "../typeorm/entities/address.entity";
import Students from "../typeorm/entities/students.entity";


@Injectable()
export default class StudentService {
constructor(
    @InjectRepository(Students) 
    private  studentRepositorie:Repository<Students>,
    @InjectRepository(Address) 
    private  addressRepositorie:Repository<Address>,
    ){}

    async create(createStudent: CreateStudentDto):Promise<Students>{
        const { address, birth_day, classes, height, name, phone, type_student, weight } = createStudent
        try {
            const createAddress = await this.addressRepositorie.save(address)
            const student = {
                address:createAddress,
                birth_day: new Date(birth_day),
                classes: 1,
                height: height,
                name: name,
                phone: phone,
                type_student: type_student || 'DEFAULT',
                weight: weight,
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
