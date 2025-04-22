/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_id_user_id_key" ON "Order"("id", "user_id");
