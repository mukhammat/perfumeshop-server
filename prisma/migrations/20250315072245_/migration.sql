/*
  Warnings:

  - Added the required column `base_note` to the `Perfume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_note` to the `Perfume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `top_note` to the `Perfume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perfume" ADD COLUMN     "base_note" TEXT NOT NULL,
ADD COLUMN     "middle_note" TEXT NOT NULL,
ADD COLUMN     "top_note" TEXT NOT NULL;
