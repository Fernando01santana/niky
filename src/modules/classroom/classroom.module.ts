/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contact from '../contact/typeorm/entities/contact.entity';
import Address from '../student/typeorm/entities/address.entity';
import Students from '../student/typeorm/entities/students.entity';
import TypeStudant from '../student/typeorm/entities/typeStudant';
import TypeTask from './typeorm/entities/typeTask.entities';

@Module({
    imports: [TypeOrmModule.forFeature([Students, Address,TypeStudant,Contact,TypeTask])],
    controllers: [],
    providers: [],
})
export class ClassroomModule {}
