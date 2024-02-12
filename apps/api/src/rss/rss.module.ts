import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { ArticleModule } from 'src/article/article.module';

@Module({
  providers: [RssService],
  imports: [ArticleModule],
})
export class RssModule {}
