/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './controllers/student.controller';
import StudentService from './services/student.service';
import Address from './typeorm/entities/address.entity';
import Students from './typeorm/entities/students.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Students, Address])],
    controllers: [StudentController],
    providers: [StudentService],
    exports:[StudentService]
})
export class StudentModule {}
