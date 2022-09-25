import { BadRequestException, Injectable, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Classes from "src/modules/classroom/typeorm/entities/classes.entities";
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
    @InjectRepository(Classes)
    private classesRepositorie:Repository<Classes>
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

    async update(updatedStudent:UpdatedStudentDto):Promise<Students>{
        const address = await this.addressRepositorie.findBy(updatedStudent.data.address)
        const type_student = await this.typeStudantRepositorie.findBy({name:updatedStudent.data.type_student})

        if(!type_student){
            throw new BadRequestException('Nenhuma atividade encontrada com o nome informado')
        }

        if(!address){
            const adressSave = await this.addressRepositorie.save(updatedStudent.data.address)
            updatedStudent.data.address = adressSave
            updatedStudent.data.type_student = type_student[0].name
        }

        const studentUpdate = await this.studentRepositorie.findBy({id:updatedStudent.id})
        studentUpdate[0].address = address[0]
        this.studentRepositorie.save(studentUpdate[0])
        return studentUpdate[0]
    }

    async findAll():Promise<Students[]>{
        return this.studentRepositorie.find()
    }

    async findOne(id:string):Promise<Students>{
        const students = await this.studentRepositorie.findBy({id:id})
        if (!students) {
            throw new BadRequestException("Estudante especificado nao encontrado");
        }
        return students[0]
    }

    async findByTypeStudent(typeStudent:string):Promise<Students>{
        const searchTypeStudent = await this.typeStudantRepositorie.findBy({name:typeStudent})
        if (!searchTypeStudent) {
            throw new BadRequestException("Tipo de aluno informado nao encontrado");
        }
        const student = await this.studentRepositorie.findBy({type_student:searchTypeStudent})
        if (!student) {
            throw new BadRequestException("Nenhum aluno encontrado com o tipo informado");
        }
        return student[0]
    }

    async findStudantsByClass(classId):Promise<Students[]>{
        const studantsClasses = await this.classesRepositorie.findBy({id:classId})
        const studants = studantsClasses.map(studants => studants.student)
        return studants[0]
    }

    async remove(id:string):Promise<void>{
        const student = await this.studentRepositorie.findBy({id:id})
        await this.studentRepositorie.remove(student)
        return
    }
}
