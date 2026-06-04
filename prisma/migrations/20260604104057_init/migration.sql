-- CreateTable
CREATE TABLE `Creneau` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `dateDebut` DATETIME(3) NOT NULL,
    `dateFin` DATETIME(3) NOT NULL,
    `statut` ENUM('AVANT', 'EN_COURS', 'FINI') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `capacite` INTEGER NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participation` (
    `id` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL,
    `utilisateurId` VARCHAR(191) NOT NULL,
    `creneauId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `codePostal` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `motDePasse` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Panier` (
    `id` VARCHAR(191) NOT NULL,
    `utilisateurId` VARCHAR(191) NOT NULL,
    `prix` DOUBLE NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit_Panier` (
    `id` VARCHAR(191) NOT NULL,
    `panierId` VARCHAR(191) NOT NULL,
    `produitId` VARCHAR(191) NOT NULL,
    `quantite` DOUBLE NOT NULL,
    `unite` DOUBLE NOT NULL,
    `prix` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `id` VARCHAR(191) NOT NULL,
    `typeproduitId` VARCHAR(191) NOT NULL,
    `quantite` DOUBLE NOT NULL,
    `dateArrive` DATETIME(3) NOT NULL,
    `dateSortie` DATETIME(3) NOT NULL,
    `datePeremption` DATETIME(3) NOT NULL,
    `type_ProduitId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type_Produit` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `quantiteMax` DOUBLE NOT NULL,
    `unite` ENUM('VRAC', 'UNITE') NOT NULL,
    `prix` DOUBLE NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commande_Produit` (
    `id` VARCHAR(191) NOT NULL,
    `commandeId` VARCHAR(191) NOT NULL,
    `typeProduitId` VARCHAR(191) NOT NULL,
    `quantite` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commande` (
    `id` VARCHAR(191) NOT NULL,
    `utilisateurId` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_creneauId_fkey` FOREIGN KEY (`creneauId`) REFERENCES `Creneau`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Panier` ADD CONSTRAINT `Panier_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produit_Panier` ADD CONSTRAINT `Produit_Panier_panierId_fkey` FOREIGN KEY (`panierId`) REFERENCES `Panier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produit_Panier` ADD CONSTRAINT `Produit_Panier_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_type_ProduitId_fkey` FOREIGN KEY (`type_ProduitId`) REFERENCES `Type_Produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande_Produit` ADD CONSTRAINT `Commande_Produit_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `Commande`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande_Produit` ADD CONSTRAINT `Commande_Produit_typeProduitId_fkey` FOREIGN KEY (`typeProduitId`) REFERENCES `Type_Produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_utilisateurId_fkey` FOREIGN KEY (`utilisateurId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
