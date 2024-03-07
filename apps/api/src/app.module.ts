import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { RssModule } from './rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://rootName:password@localhost:27018/'),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    RssModule,
    AuthModule,
    UserModule,
    ArticleModule,
  ],
})
export class AppModule {}
