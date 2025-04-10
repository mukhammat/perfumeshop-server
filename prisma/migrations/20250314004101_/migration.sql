/*
  Warnings:

  - You are about to drop the column `image_path` on the `Perfume` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_path]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `perfume_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "perfume_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Perfume" DROP COLUMN "image_path";

-- CreateIndex
CREATE UNIQUE INDEX "Image_image_path_key" ON "Image"("image_path");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_perfume_id_fkey" FOREIGN KEY ("perfume_id") REFERENCES "Perfume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
