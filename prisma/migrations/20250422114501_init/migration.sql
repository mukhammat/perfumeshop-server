/*
  Warnings:

  - Made the column `country` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL;
