/*
  Warnings:

  - You are about to drop the column `type_ProduitId` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `typeproduitId` on the `Produit` table. All the data in the column will be lost.
  - Added the required column `typeProduitId` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Produit` DROP FOREIGN KEY `Produit_type_ProduitId_fkey`;

-- DropIndex
DROP INDEX `Produit_type_ProduitId_fkey` ON `Produit`;

-- AlterTable
ALTER TABLE `Produit` DROP COLUMN `type_ProduitId`,
    DROP COLUMN `typeproduitId`,
    ADD COLUMN `typeProduitId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_typeProduitId_fkey` FOREIGN KEY (`typeProduitId`) REFERENCES `Type_Produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
