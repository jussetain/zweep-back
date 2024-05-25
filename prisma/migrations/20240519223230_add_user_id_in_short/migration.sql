/*
  Warnings:

  - Added the required column `userId` to the `Short` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Short" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Short" ADD CONSTRAINT "Short_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
