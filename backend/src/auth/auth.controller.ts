import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  @ApiOperation({ summary: 'Mock login endpoint' })
  @ApiBody({ type: LoginDto })
  @Post()
  login(@Body() body: LoginDto) {
    return {
      success: true,
      token: 'mock-token',
      user: {
        email: body.email,
      },
    };
  }
}
