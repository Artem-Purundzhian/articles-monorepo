-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "author" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "mediaLink" TEXT,
ADD COLUMN     "published" TIMESTAMP(3);
