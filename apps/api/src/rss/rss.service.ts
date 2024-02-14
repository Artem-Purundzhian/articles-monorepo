import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Article } from '@prisma/client';
import { CreateArticleDto } from 'src/article/dto';
import { PrismaService } from 'src/prisma/prisma.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Parser = require('rss-parser');

const parser = new Parser();

@Injectable()
export class RssService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(RssService.name);

  async onModuleInit() {
    await this.fetchAllFeeds();
  }

  async fetchAllFeeds() {
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
          this.createArticle({
            title: article.title,
            link: article.link,
          });
        }),
      );
    } catch (error) {
      this.logger.error(`Error fetching/parsing feeds`, error);
      console.error('Error parsing feeds:', error);
      throw error;
    }
  }

  async createArticle(dto: CreateArticleDto) {
    const article = await this.prisma.article.upsert({
      where: {
        link: dto.link,
      },
      create: {
        ...dto,
      },
      update: {},
    });

    console.log(article);
    return article;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleInterval() {
    this.logger.debug('Called every 10 seconds');
    await this.fetchAllFeeds();
  }
}
