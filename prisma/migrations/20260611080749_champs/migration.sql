/*
  Warnings:

  - You are about to alter the column `unite` on the `Produit_Panier` table. The data in that column could be lost. The data in that column will be cast from `Double` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `Creneau` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Produit` MODIFY `dateSortie` DATETIME(3) NULL,
    MODIFY `datePeremption` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Produit_Panier` MODIFY `unite` ENUM('VRAC', 'UNITE') NOT NULL;
