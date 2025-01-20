/*
  Warnings:

  - You are about to drop the column `phone` on the `Admin` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Admin_phone_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "phone";
