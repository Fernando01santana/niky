import { StudentModule } from './modules/student/student.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/database/typeormModule';
import { InstructorModule } from './modules/instructor/instructor.module';
import Classes from './modules/classroom/typeorm/entities/classes.entities';

 
@Module({
  imports: [StudentModule, TypeOrmModule,InstructorModule,Classes],
  controllers: [],
  providers: [],
})
export class AppModule {}
