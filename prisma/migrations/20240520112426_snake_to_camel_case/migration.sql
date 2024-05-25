/*
  Warnings:

  - You are about to drop the column `created_at` on the `Short` table. All the data in the column will be lost.
  - You are about to drop the column `expires_in` on the `Short` table. All the data in the column will be lost.
  - You are about to drop the column `redirect_to` on the `Short` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `redirectTo` to the `Short` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Short" DROP COLUMN "created_at",
DROP COLUMN "expires_in",
DROP COLUMN "redirect_to",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresIn" INTEGER NOT NULL DEFAULT 86400,
ADD COLUMN     "redirectTo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
