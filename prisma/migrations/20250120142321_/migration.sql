/*
  Warnings:

  - You are about to drop the `Analog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PerfumeAnalog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[analog]` on the table `Perfume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `analog` to the `Perfume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PerfumeAnalog" DROP CONSTRAINT "_PerfumeAnalog_A_fkey";

-- DropForeignKey
ALTER TABLE "_PerfumeAnalog" DROP CONSTRAINT "_PerfumeAnalog_B_fkey";

-- AlterTable
ALTER TABLE "Perfume" ADD COLUMN     "analog" TEXT NOT NULL;

-- DropTable
DROP TABLE "Analog";

-- DropTable
DROP TABLE "_PerfumeAnalog";

-- CreateIndex
CREATE UNIQUE INDEX "Perfume_analog_key" ON "Perfume"("analog");
