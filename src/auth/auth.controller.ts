import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshRequest } from './dto/refresh-request.dto';
import { User } from '../user/entitiy/user.entitiy';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-guard';
import { ApiTags } from '@nestjs/swagger';

export interface AuthenticationPayload {
  user: User;
  payload: {
    type: string;
    access_token: string;
    refresh_token?: string;
  };
}

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  private readonly users: UserService;
  private readonly tokens: AuthService;

  public constructor(users: UserService, tokens: AuthService) {
    this.users = users;
    this.tokens = tokens;
  }

  @Post('/register')
  public async register(@Body() body: CreateUserDto) {
    const user = await this.users.createUser(body);

    const token = await this.tokens.generateAccessToken(user);
    const refresh = await this.tokens.generateRefreshToken(
      user,
      60 * 60 * 24 * 2,
    );

    const payload = this.buildResponsePayload(user, token, refresh);

    return {
      status: 'success',
      data: payload,
    };
  }

  @Post('/login')
  public async login(@Body() body: LoginDto) {
    const { email, password } = body;

    const user = await this.users.findForEmail(email);
    // const valid = user
    //   ? await this.users.validateCredentials(user, password)
    //   : false;
    const valid = true;

    if (!valid) {
      throw new UnauthorizedException('The login is invalid');
    }

    const token = await this.tokens.generateAccessToken(user);
    const refresh = await this.tokens.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = this.buildResponsePayload(user, token, refresh);

    return {
      status: 'success',
      data: payload,
    };
  }

  @Post('/refresh')
  public async refresh(@Body() body: RefreshRequest) {
    const { user, token } = await this.tokens.createAccessTokenFromRefreshToken(
      body.refresh_token,
    );

    const payload = this.buildResponsePayload(user, token);

    return {
      status: 'success',
      data: payload,
    };
  }

  private buildResponsePayload(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticationPayload {
    return {
      user: user,
      payload: {
        type: 'bearer',
        access_token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      },
    };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  public async getUser(@Req() request) {
    const userId = request.user.id;

    const user = await this.users.getUser(userId);

    return {
      status: 'success',
      data: user,
    };
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  public async logout(@Req() request) {
    const userId = request.user.id;
    const user = await this.users.getUser(userId);
    await this.tokens.logout(user);

    return {
      status: 'success',
      data: user,
    };
  }
}
