import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { parse } from 'date-fns';
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
      'https://techcrunch.com/feed/',
      'https://www.cnet.com/rss/news/',
    ];

    try {
      const fetchPromises = urls.map((url) => parser.parseURL(url));
      const allFeeds = await Promise.all(fetchPromises);

      allFeeds.forEach((feed) =>
        feed.items.forEach((article: any) => {
          this.createArticle({
            feedTitle: feed.title,
            title: article.title,
            link: article.link,
            published: parse(
              article.pubDate,
              'EEE, dd MMM yyyy HH:mm:ss XXXX',
              new Date(),
            ),
            mediaLink: article.media,
            author: article.author || article.creator,
            category: article.category,
            description: `${article.description || article.content}`,
            content: `${article.content || article.description}`,
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

    return article;
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  //   await this.fetchAllFeeds();
  // }
}
