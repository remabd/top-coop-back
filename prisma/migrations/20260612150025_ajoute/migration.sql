-- DropForeignKey
ALTER TABLE `Commande_Produit` DROP FOREIGN KEY `Commande_Produit_commandeId_fkey`;

-- DropForeignKey
ALTER TABLE `Participation` DROP FOREIGN KEY `Participation_creneauId_fkey`;

-- DropForeignKey
ALTER TABLE `Participation` DROP FOREIGN KEY `Participation_utilisateurId_fkey`;

-- DropForeignKey
ALTER TABLE `Produit_Panier` DROP FOREIGN KEY `Produit_Panier_panierId_fkey`;

-- DropIndex
DROP INDEX `Commande_Produit_commandeId_fkey` ON `Commande_Produit`;

-- DropIndex
DROP INDEX `Participation_creneauId_fkey` ON `Participation`;

-- DropIndex
DROP INDEX `Participation_utilisateurId_fkey` ON `Participation`;

-- DropIndex
DROP INDEX `Produit_Panier_panierId_fkey` ON `Produit_Panier`;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_creneauId_fkey` FOREIGN KEY (`creneauId`) REFERENCES `Creneau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produit_Panier` ADD CONSTRAINT `Produit_Panier_panierId_fkey` FOREIGN KEY (`panierId`) REFERENCES `Panier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande_Produit` ADD CONSTRAINT `Commande_Produit_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `Commande`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
