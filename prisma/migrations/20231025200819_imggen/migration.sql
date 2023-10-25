/*
  Warnings:

  - You are about to drop the `Input` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Input" DROP CONSTRAINT "Input_requestId_fkey";

-- AlterTable
ALTER TABLE "Genimage" ADD COLUMN     "prompt" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 5;

-- DropTable
DROP TABLE "Input";
