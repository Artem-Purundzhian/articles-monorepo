import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Parser = require('rss-parser');

const parser = new Parser();

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleInterval() {
    this.logger.debug('Called every 5 seconds');
    const feed = await parser.parseURL(
      'http://feeds.feedburner.com/TechCrunch',
    );

    console.log(feed.title);

    feed.items.forEach((item) => {
      console.log(item.title);
    });
  }
}
