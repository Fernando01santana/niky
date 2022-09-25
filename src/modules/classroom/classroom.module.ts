/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contact from '../instructor/typeorm/entities/contact.entity';
import Address from '../student/typeorm/entities/address.entity';
import Students from '../student/typeorm/entities/students.entity';
import TypeStudant from '../student/typeorm/entities/typeStudant';
import TypeTask from '../typeTask/typeorm/entities/typeTask.entities';
import { ClassroomController } from './controllers/Classes.controller';
import ClassroomService from './services/classroom.service';
import Classes from './typeorm/entities/classes.entities';

@Module({
    imports: [TypeOrmModule.forFeature([Students, Address,TypeStudant,Contact,TypeTask,Classes])],
    controllers: [ClassroomController],
    providers: [ClassroomService],
    exports:[ClassroomService]
})
export class ClassroomModule {}
