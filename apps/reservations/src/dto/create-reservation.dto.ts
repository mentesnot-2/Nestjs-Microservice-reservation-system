import { Type } from "class-transformer";
import { IsDate, IsNotEmptyObject,IsDefined,ValidateNested,} from "class-validator";
import { CreateChargeDto } from "@app/common/dto/create-charge.dto";

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate:Date;

    @IsDate()
    @Type(() => Date)
    endDate:Date;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge:CreateChargeDto
}
