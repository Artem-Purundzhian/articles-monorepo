import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateArticleDto, EditArticleDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from 'src/schemas/article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async createArticle(userId: string, dto: CreateArticleDto) {
    if (!userId) throw new ForbiddenException('Access to resources denied');

    const existingArticle = await this.articleModel.findOne({ link: dto.link });

    if (existingArticle) {
      return existingArticle;
    }

    const article = new this.articleModel({ ...dto, userId });
    return article.save();
  }

  async getArticles(query: string, page: number = 1, limit: number = 3) {
    const skip = (page - 1) * limit;
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const articles = await this.articleModel
      .find(filter)
      .sort({ published: -1 })
      .skip(skip)
      .limit(limit);

    return articles;
  }

  async getArticleCount(query: string) {
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const count = await this.articleModel.countDocuments(filter);
    return count;
  }

  async getArticleById(articleId: number) {
    const article = await this.articleModel.findById(articleId);

    return article;
  }

  async editArticleById(
    userId: string,
    articleId: string,
    dto: EditArticleDto,
  ) {
    if (!userId) throw new ForbiddenException('Access to resources denied');

    const article = await this.articleModel.findByIdAndUpdate(articleId, dto, {
      new: true,
    });

    return article;
  }

  async deleteArticleById(userId: string, articleId: string) {
    if (!userId) throw new ForbiddenException('Access to resources denied');

    await this.articleModel.findByIdAndDelete(articleId);
  }
}
