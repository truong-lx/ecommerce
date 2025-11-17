import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>('MYSQL_URI'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma connected:', this.config.get<string>('MYSQL_URI'));
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
