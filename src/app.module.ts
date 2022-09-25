import { StudentModule } from './modules/student/student.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/database/typeormModule';

 
@Module({
  imports: [StudentModule, TypeOrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
