import dotenv from 'dotenv';
dotenv.config();

import { JwtSignOptions } from '@nestjs/jwt';

const secret = process.env.JWT_SECRET;

interface JwtConfig {
  access: JwtSignOptions;
  refresh: JwtSignOptions;
  password?: JwtSignOptions;
}

export const CookieName = {
  access: process.env.ACCESS_COOKIE_NAME,
  refresh: process.env.REFRESH_COOKIE_NAME,
};

export const JwtConfig: JwtConfig = {
  access: { secret: `admin_acs_${secret}`, expiresIn: '15min' },
  refresh: { secret: `admin_rsh_${secret}`, expiresIn: '3d' }
};
