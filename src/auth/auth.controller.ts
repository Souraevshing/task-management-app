import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@ApiTags("Users")
@Controller("api/v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Sign Up User" })
  @ApiBearerAuth()
  @Post("/signup")
  signUpUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUpUser(authCredentialsDto);
  }

  // returning accessToken as object after successful login
  @ApiOperation({ summary: "Sign In User" })
  @ApiBearerAuth()
  @Post("/signin")
  signInUser(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signInUser(authCredentialsDto);
  }
}
