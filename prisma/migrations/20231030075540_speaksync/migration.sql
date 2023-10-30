/*
  Warnings:

  - You are about to drop the `Genimage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Genimage" DROP CONSTRAINT "Genimage_userId_fkey";

-- DropTable
DROP TABLE "Genimage";

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "prompt" TEXT,
    "version" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
