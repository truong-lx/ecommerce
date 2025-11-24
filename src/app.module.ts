import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { CollectionModule } from './modules/collection/collection.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { SuccessResponseInterceptor } from './libs/interceptors/success-response';
import { DatabaseModule } from './modules/database/database.module';
import { MediaModule } from './modules/media/media.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule.forRoot('mongodb'),
    AuthModule,
    UserModule,
    ProductModule,
    CollectionModule,
    OrderModule,
    CartModule,
    MediaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
  }
}
