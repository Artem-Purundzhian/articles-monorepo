import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ArticleService } from './article.service';
import { GetUser } from '../auth/decorator';
import { CreateArticleDto, EditArticleDto } from './dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Post()
  @UseGuards(JwtGuard)
  createArticle(@GetUser('id') userId: number, @Body() dto: CreateArticleDto) {
    return this.articleService.createArticle(userId, dto);
  }

  @Get()
  getArticles() {
    return this.articleService.getArticles();
  }

  @Get(':id')
  getArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    return this.articleService.getArticleById(articleId);
  }

  @Patch(':id')
  editArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
    @Body() dto: EditArticleDto,
  ) {
    return this.articleService.editArticleById(userId, articleId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    return this.articleService.deleteArticleById(userId, articleId);
  }
}
