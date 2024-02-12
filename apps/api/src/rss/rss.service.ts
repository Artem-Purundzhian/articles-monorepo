import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Article } from '@prisma/client';
import { ArticleService } from 'src/article/article.service';
import { GetUser } from 'src/auth/decorator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Parser = require('rss-parser');

const parser = new Parser();

@Injectable()
export class RssService {
  constructor(private articleService: ArticleService) {}

  private readonly logger = new Logger(RssService.name);

  async onModuleInit(@GetUser('id') userId: number) {
    await this.fetchAllFeeds(userId);
  }

  async fetchAllFeeds(userId: number) {
    const urls = [
      'http://feeds.feedburner.com/TechCrunch',
      'https://www.theverge.com/rss/index.xml',
      'https://www.cnet.com/rss/news/',
    ];

    try {
      const fetchPromises = urls.map((url) => parser.parseURL(url));
      const allFeeds = await Promise.all(fetchPromises);

      allFeeds.forEach((feed) =>
        feed.items.forEach((article: Article) => {
          this.articleService.createArticle(userId, {
            title: article.title,
            link: article.link,
          });
        }),
      );
    } catch (error) {
      // Handle errors if any of the promises reject
      this.logger.error(`Error fetching/parsing feeds`, error);
      console.error('Error parsing feeds:', error);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleInterval() {
    this.logger.debug('Called every 5 seconds');
  }
}
