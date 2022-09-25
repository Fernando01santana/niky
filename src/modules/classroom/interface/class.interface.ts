import { IsString } from "class-validator"

export class CreateStudentDto{
        instructor_id:string
        student_id:string
        type_task_id:string
        qtde_student:number
        max_student:number
        hour_classroom:string
        initial_date:string
        final_date:string
        class_duration:string
    }
