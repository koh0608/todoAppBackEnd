import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfig, CookieName } from '@configs/auth.config';
import * as dotenv from 'dotenv';
import { AuthStrategy } from '@constants';

dotenv.config();

const CookieExtractor = (req: Request, key: string): string => req.cookies[key];

@Injectable()
export class AccessAuthStrategy extends PassportStrategy(JWTStrategy, AuthStrategy.JWT_ACCESS) {
  constructor() {
    super({
      secretOrKey: JwtConfig.access.secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => CookieExtractor(req, CookieName.access)])
    });
  }
  async validate(payload: AuthData) {
    return payload;
  }
}

@Injectable()
export class WebRefreshAuthStrategy extends PassportStrategy(JWTStrategy, AuthStrategy.JWT_REFRESH) {
  constructor() {
    super({
      secretOrKey: JwtConfig.refresh.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => CookieExtractor(req, CookieName.refresh)])
    });
  }
  async validate(_req: Request, payload: AuthData) {
    return payload;
  }
}

export const Strategies = [AccessAuthStrategy, WebRefreshAuthStrategy];
