import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from './prisma.service';
@Module({})
export class DatabaseModule {
  static forRoot(databaseType: 'mongodb' | 'mysql'): DynamicModule {
    if (databaseType === 'mongodb') {
      return {
        module: DatabaseModule,
        imports: [
          ConfigModule,
          MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(config: ConfigService) {
              return {
                uri: config.get<string>('MONGO_URI'),
                maxPoolSize: 50,
                authSource: 'admin',
                appName: 'Ecommerce',
                retryWrites: true,
                w: 'majority',
              };
            },
          }),
        ],
        exports: [DatabaseModule],
      };
    }
    if (databaseType === 'mysql')
      return {
        module: DatabaseModule,
        imports: [ConfigModule],
        providers: [PrismaService],
        exports: [DatabaseModule],
      };
    throw new Error('Invalid database type');
  }
}
