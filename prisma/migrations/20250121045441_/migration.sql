/*
  Warnings:

  - You are about to alter the column `title` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(240)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `title` VARCHAR(191) NOT NULL;
