import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAddonDto {

    // @IsString()
    // @IsNotEmpty()
    // brandId: string

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    category?: string
}
