import { Response } from 'express';
import ms from 'ms';

export const setResponseCookie = (res: Response, cookieName: string, data: any, expiresId?: string): void => {
  let expires: Date;
  if (expiresId) {
    const milisecond = ms(expiresId);
    expires = new Date(Date.now() + milisecond);
  }
  res.clearCookie(cookieName);
  res.cookie(cookieName, data, { httpOnly: true, secure: true, expires });
};
