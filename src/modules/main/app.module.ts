import { TransformResponseInterceptor } from '../../core/http/transform-response.interceptor';
import { TransactionModule } from '../transaction/transaction.module';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, UserModule, TransactionModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
