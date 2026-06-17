-- DropForeignKey
ALTER TABLE `Produit_Panier` DROP FOREIGN KEY `Produit_Panier_produitId_fkey`;

-- DropIndex
DROP INDEX `Produit_Panier_produitId_fkey` ON `Produit_Panier`;

-- AlterTable
ALTER TABLE `Produit_Panier` MODIFY `produitId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Produit_Panier` ADD CONSTRAINT `Produit_Panier_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
