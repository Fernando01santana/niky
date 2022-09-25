import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import Address from "src/modules/student/typeorm/entities/address.entity";
import Students from "src/modules/student/typeorm/entities/students.entity";
import { DataSource } from "typeorm";

 const ormConfig = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "teste_niky",
    entities: [Address, Students],
    migrations: ["dist/shared/typeorm/migrations/*.js"],
    // cli:{migrationsDir:"dist/shared/typeorm/migrations/*.js"},
    synchronize: true,
  })


export default ormConfig