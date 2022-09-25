export class CreateInstructorDto{
    name:string
    document:string
    title:string
    contact:string
    address:IAddress
}

interface IAddress{
    street:string
    district:string
    number:string
    city:string
    state:string
}