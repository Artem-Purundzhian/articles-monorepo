import { z } from 'zod';

export const ArticleValidator = z.object({
  category: z.string().optional(),
  title: z.string().min(2, {
    message: "Tittle can't be empty",
  }),
  description: z.string().min(2, {
    message: "Description can't be empty",
  }),
  author: z.string().min(2, {
    message: "Author can't be empty",
  }),
});

export type TArticleValidator = z.infer<typeof ArticleValidator>;
