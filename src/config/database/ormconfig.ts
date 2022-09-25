import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import Classes from "src/modules/classroom/typeorm/entities/classes.entities";
import TypeTask from "src/modules/classroom/typeorm/entities/typeTask.entities";
import Contact from "src/modules/contact/typeorm/entities/contact.entity";
import Instructor from "src/modules/instructor/typeorm/entities/instructor.entity";
import Address from "src/modules/student/typeorm/entities/address.entity";
import Students from "src/modules/student/typeorm/entities/students.entity";
import TypeStudant from "src/modules/student/typeorm/entities/typeStudant";
import { DataSource } from "typeorm";

 const ormConfig = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "teste2_nick",
    entities: [Address, Students,TypeStudant,Contact,Instructor,Classes,TypeTask],
    migrations: ["dist/shared/typeorm/migrations/*.js"],
    // cli:{migrationsDir:"dist/shared/typeorm/migrations/*.js"},
    synchronize: false,
  })


export default ormConfig