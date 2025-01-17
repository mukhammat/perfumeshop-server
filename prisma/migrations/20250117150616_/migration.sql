/*
  Warnings:

  - You are about to drop the column `analogs` on the `Perfume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Perfume" DROP COLUMN "analogs";

-- CreateTable
CREATE TABLE "Analog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Analog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PerfumeAnalog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PerfumeAnalog_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analog_name_key" ON "Analog"("name");

-- CreateIndex
CREATE INDEX "_PerfumeAnalog_B_index" ON "_PerfumeAnalog"("B");

-- AddForeignKey
ALTER TABLE "_PerfumeAnalog" ADD CONSTRAINT "_PerfumeAnalog_A_fkey" FOREIGN KEY ("A") REFERENCES "Analog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfumeAnalog" ADD CONSTRAINT "_PerfumeAnalog_B_fkey" FOREIGN KEY ("B") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
