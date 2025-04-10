/*
  Warnings:

  - You are about to drop the column `category_id` on the `Perfume` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Perfume" DROP CONSTRAINT "Perfume_category_id_fkey";

-- AlterTable
ALTER TABLE "Perfume" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "CategoryPerfume" (
    "category_id" INTEGER NOT NULL,
    "perfume_id" INTEGER NOT NULL,

    CONSTRAINT "CategoryPerfume_pkey" PRIMARY KEY ("category_id","perfume_id")
);

-- AddForeignKey
ALTER TABLE "CategoryPerfume" ADD CONSTRAINT "CategoryPerfume_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryPerfume" ADD CONSTRAINT "CategoryPerfume_perfume_id_fkey" FOREIGN KEY ("perfume_id") REFERENCES "Perfume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
