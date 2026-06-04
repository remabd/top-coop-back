/*
  Warnings:

  - A unique constraint covering the columns `[prenom]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_prenom_key` ON `User`(`prenom`);
