import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  createArticle(@GetUser('id') userId: string, @Body() dto: CreateArticleDto) {
    return this.articleService.createArticle(userId, dto);
  }

  @Get()
  getArticles(
    @Query('query', new DefaultValuePipe('')) query: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ) {
    return this.articleService.getArticles(query, page);
  }

  @Get('count')
  getArticleCount(@Query('query', new DefaultValuePipe('')) query: string) {
    return this.articleService.getArticleCount(query);
  }

  @Get(':id')
  getArticleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    return this.articleService.getArticleById(articleId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editArticleById(
    @GetUser('id') userId: string,
    @Param('id') articleId: string,
    @Body() dto: EditArticleDto,
  ) {
    return this.articleService.editArticleById(userId, articleId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteArticleById(
    @GetUser('id') userId: string,
    @Param('id') articleId: string,
  ) {
    return this.articleService.deleteArticleById(userId, articleId);
  }
}
