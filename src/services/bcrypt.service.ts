import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/configs/bcrypt.config';

export const hashPassword = (password: string) => bcrypt.hashSync(password, saltRounds);
export const comparePassword = (input: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => bcrypt.compare(input, password, (_err, isMatch) => resolve(isMatch)));
};

@Injectable()
export class BcryptService {
  hashPassword(password: string) {
    return hashPassword(password);
  }

  comparePassword(input: string, password: string) {
    return comparePassword(input, password);
  }
}
