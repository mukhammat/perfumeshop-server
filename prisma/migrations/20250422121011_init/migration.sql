/*
  Warnings:

  - You are about to alter the column `country` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "latitude" DECIMAL(65,30),
ADD COLUMN     "longitude" DECIMAL(65,30),
ALTER COLUMN "country" SET DEFAULT 'SAU',
ALTER COLUMN "country" SET DATA TYPE VARCHAR(3);
