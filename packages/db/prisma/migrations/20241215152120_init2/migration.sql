/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github', 'Email');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" "AuthType" NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "password" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "authType" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");
