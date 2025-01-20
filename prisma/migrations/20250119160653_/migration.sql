-- CreateTable
CREATE TABLE "Perfume" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "perfume_code" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "image_path" TEXT,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Perfume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Analog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "is_superadmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PerfumeAnalog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PerfumeAnalog_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfume_perfume_code_key" ON "Perfume"("perfume_code");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Analog_name_key" ON "Analog"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- CreateIndex
CREATE INDEX "_PerfumeAnalog_B_index" ON "_PerfumeAnalog"("B");

-- AddForeignKey
ALTER TABLE "Perfume" ADD CONSTRAINT "Perfume_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfumeAnalog" ADD CONSTRAINT "_PerfumeAnalog_A_fkey" FOREIGN KEY ("A") REFERENCES "Analog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfumeAnalog" ADD CONSTRAINT "_PerfumeAnalog_B_fkey" FOREIGN KEY ("B") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
