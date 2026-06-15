/*
  Warnings:

  - A unique constraint covering the columns `[ean]` on the table `Type_Produit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Type_Produit_ean_key` ON `Type_Produit`(`ean`);
