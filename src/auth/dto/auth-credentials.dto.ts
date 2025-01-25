import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class AuthCredentialsDto {
  @ApiProperty({
    required: true,
    type: "string",
    default: "",
    description: "User's email address",
  })
  @IsEmail({}, { message: "Invalid email format" })
  @MinLength(5, { message: "Email is too short (minimum 5 characters)" })
  @MaxLength(50, { message: "Email is too long (maximum 50 characters)" })
  username: string;

  @ApiProperty({
    required: true,
    type: "string",
    default: "",
    description: "User's password",
  })
  @IsString()
  @MinLength(8, { message: "Password is too short (minimum 8 characters)" })
  @MaxLength(32, { message: "Password is too long (maximum 32 characters)" })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password too weak. Must include upper/lowercase letters, numbers, and special characters",
  })
  password: string;
}
