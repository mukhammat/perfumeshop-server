/*
  Warnings:

  - You are about to drop the column `paid_at` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OrderStatusHistory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paid_at",
DROP COLUMN "payment_method",
DROP COLUMN "total_price";

-- AlterTable
ALTER TABLE "OrderStatusHistory" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
