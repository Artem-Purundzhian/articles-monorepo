export interface Article {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: Date;
  category: string;
  title: string;
  description: string;
  content: string;
  feedTitle: string;
  link: string;
  author: string;
  mediaLink: string;
}
