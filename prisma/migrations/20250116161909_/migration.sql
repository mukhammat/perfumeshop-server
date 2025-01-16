/*
  Warnings:

  - You are about to drop the column `brand_id` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `perfume_id` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the `Analog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `perfume_code` to the `Perfume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Analog" DROP CONSTRAINT "Analog_perfume_id_fkey";

-- DropForeignKey
ALTER TABLE "Perfume" DROP CONSTRAINT "Perfume_brand_id_fkey";

-- AlterTable
ALTER TABLE "Perfume" DROP COLUMN "brand_id",
DROP COLUMN "perfume_id",
ADD COLUMN     "analogs" TEXT[],
ADD COLUMN     "perfume_code" TEXT NOT NULL;

-- DropTable
DROP TABLE "Analog";

-- DropTable
DROP TABLE "Brand";
