import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateArticleDto, EditArticleDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async createArticle(userId: number, dto: CreateArticleDto) {
    if (!userId) throw new ForbiddenException('Access to resources denied');

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

  async getArticles() {
    const articles = await this.prisma.article.findMany();

    return articles;
  }

  async getArticleById(articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    return article;
  }

  async editArticleById(
    userId: number,
    articleId: number,
    dto: EditArticleDto,
  ) {
    if (!userId) throw new ForbiddenException('Access to resources denied');

    const article = await this.prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        ...dto,
      },
    });

    return article;
  }

  async deleteArticleById(userId: number, articleId: number) {
    if (!userId) throw new ForbiddenException('Access to resources denied');

    await this.prisma.article.delete({
      where: {
        id: articleId,
      },
    });
  }
}
