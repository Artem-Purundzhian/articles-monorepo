import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateArticleDto, EditArticleDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async createArticle(userId: number, dto: CreateArticleDto) {
    const article = await this.prisma.article.upsert({
      where: {
        link: dto.link,
      },
      create: {
        ...dto,
      },
      update: {
        ...dto,
      },
    });

    return article;
  }

  async getArticles() {
    const articles = await this.prisma.article.findMany();

    return articles;
  }

  async getArticleById(userId: number, articleId: number) {
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
    // get the article by id
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    // check if user owns the article
    // if (!article || article.userId !== userId)
    throw new ForbiddenException('Access to resources denied');

    return this.prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteArticleById(userId: number, articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    // check if user owns the article
    // if (!article || article.userId !== userId)
    // throw new ForbiddenException('Access to resources denied');

    await this.prisma.article.delete({
      where: {
        id: articleId,
      },
    });
  }
}
