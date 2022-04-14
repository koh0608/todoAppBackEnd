import { AdminEntity } from '@modules/admin/entities/admin.entity';
import { Strategies } from '@modules/auth/auth.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminAuthService } from './services/admin-auth.service';

const Entities = [AdminEntity];

@Module({
  imports: [SequelizeModule.forFeature(Entities), JwtModule.register({})],
  providers: [...Strategies, AdminAuthService],
  exports: [AuthModule],
  controllers: [AdminAuthController]
})
export class AuthModule {}
