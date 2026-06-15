/*
  Warnings:

  - Added the required column `ean` to the `Type_Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Type_Produit` ADD COLUMN `ean` VARCHAR(191) NOT NULL;
