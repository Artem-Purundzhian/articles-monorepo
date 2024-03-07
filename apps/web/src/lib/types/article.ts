export interface Article {
  _id: string;
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
