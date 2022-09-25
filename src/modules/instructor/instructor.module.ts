/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Classes from '../classroom/typeorm/entities/classes.entities';
import Contact from '../contact/typeorm/entities/contact.entity';
import Address from '../student/typeorm/entities/address.entity';
import Students from '../student/typeorm/entities/students.entity';
import TypeStudant from '../student/typeorm/entities/typeStudant';

@Module({
    imports: [TypeOrmModule.forFeature([Classes])],
    controllers: [],
    providers: [],
})
export class InstructorModule {}
