export interface IClass{
        id:string,
        instructor_id:string,
        student_id:string,
        qtde_student:number,
        hour_classroom:string,
        initial_date:Date,
        date_final:Date,
        class_duration:number,
        type_task:typeTask,
        created_at:Date,
        updated_at:Date
    }


    enum typeTask {
        type1 = 'TYPE1',
        type2 = 'TYPE2'
    }