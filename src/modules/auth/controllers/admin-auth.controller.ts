import { CookieName, JwtConfig } from '@configs/auth.config';
import { AuthData } from '@decorators/auth.decorator';
import { JWTAuthGuard, JWTRefreshGuard } from '@guards/auth.guard';
import { Body, Controller, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { setResponseCookie } from '@services/cookie.service';
import { Request, Response } from 'express';
import * as DTO from '../dto/auth.dto';
import { AdminAuthService } from '../services/admin-auth.service';

@ApiTags('AdminAuthentication')
@Controller('auth/admin')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}

  @ApiOperation({ summary: 'Admin Login' })
  @ApiResponse({ status: 200, type: DTO.LoginResponseDTO })
  @ApiBody({ type: DTO.LoginDTO })
  @Post('login')
  async login(@Body() body: DTO.LoginDTO, @Res({ passthrough: true }) res: Response): Promise<DTO.LoginResponseDTO> {
    try {
      const { data, accessToken, refreshToken } = await this.authService.login(body.email, body.password);
      setResponseCookie(res, CookieName.access, accessToken);
      setResponseCookie(res, CookieName.refresh, refreshToken, JwtConfig.refresh.expiresIn as string);
      res.status(200);
      return {
        message: 'Success',
        statusCode: 200,
        payload: data
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Dashboard Logout' })
  @ApiResponse({ status: 200, type: DTO.StandardResponse })
  @UseGuards(JWTAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<DTO.StandardResponse> {
    try {
      res.clearCookie(CookieName.access);
      res.clearCookie(CookieName.refresh);
      res.status(200);
      req.logout();
      return { message: 'Logout successful', statusCode: 200 };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiResponse({ status: 200, type: DTO.LoginResponseDTO })
  @ApiBody({ type: DTO.RevokeDTO })
  @Post('refresh')
  @UseGuards(JWTRefreshGuard)
  async revoke(
    @Req() _req: Request,
    @Res({ passthrough: true }) res: Response,
    @AuthData() user: AuthData
  ): Promise<DTO.LoginResponseDTO> {
    try {
      const data = await this.authService.revoke(user.id);
      const { accessToken, refreshToken } = data;
      setResponseCookie(res, CookieName.access, accessToken);
      setResponseCookie(res, CookieName.refresh, refreshToken, JwtConfig.refresh.expiresIn as string);
      res.status(200);
      return {
        message: 'Success',
        statusCode: 200,
        payload: data.data
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
