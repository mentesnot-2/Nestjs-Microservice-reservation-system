import { IsCreditCard, IsString,IsNumber, IsNotEmpty } from "class-validator"

export class CardDto {
    @IsString()
    @IsNotEmpty()
    cvc:string

    @IsNumber()
    exp_month:number
    @IsNumber()
    exp_year:number

    number:string
}