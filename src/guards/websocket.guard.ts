import { JwtConfig } from '@configs/auth.config';
import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';
import { CookieName } from '@configs/auth.config';

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const cookies = new Cookies(context.args[0].handshake.headers.cookie);
    const token = cookies.get(CookieName.access);
    try {
      const decoded = jwt.verify(token, JwtConfig.access.secret) as any;
      if (!decoded || !decoded.id) return false;
      return true;
    } catch (ex) {
      return false;
    }
  }
}
