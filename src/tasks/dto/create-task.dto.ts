import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @ApiProperty({ required: true, type: "string", default: "" })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, type: "string", default: "" })
  @IsNotEmpty()
  description: string;
}
