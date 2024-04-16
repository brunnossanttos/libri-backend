/*
  Warnings:

  - A unique constraint covering the columns `[cellphone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bithDay` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellphone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bithDay" TEXT NOT NULL,
ADD COLUMN     "cellphone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");
