/*
  Warnings:

  - A unique constraint covering the columns `[perfume_code]` on the table `Perfume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Perfume_perfume_code_key" ON "Perfume"("perfume_code");
