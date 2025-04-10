-- CreateTable
CREATE TABLE "Perfume" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "perfume_code" TEXT NOT NULL,
    "description" TEXT,
    "custom_price_per_ml" DOUBLE PRECISION NOT NULL,
    "price_30ml" DOUBLE PRECISION,
    "price_50ml" DOUBLE PRECISION,
    "image_path" TEXT,
    "category_id" INTEGER NOT NULL,
    "analog" TEXT NOT NULL,

    CONSTRAINT "Perfume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfume_perfume_code_key" ON "Perfume"("perfume_code");

-- CreateIndex
CREATE UNIQUE INDEX "Perfume_analog_key" ON "Perfume"("analog");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Perfume" ADD CONSTRAINT "Perfume_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
