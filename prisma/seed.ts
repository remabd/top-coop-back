import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

const SALT = Number(process.env.SALT ?? 10);
const MOT_DE_PASSE = 'Test!1te';

// Quelques dates utilitaires (par rapport à "aujourd'hui")
const jour = 24 * 60 * 60 * 1000;
const dans = (n: number) => new Date(Date.now() + n * jour);
const heure = (d: Date, h: number) => {
  const r = new Date(d);
  r.setHours(h, 0, 0, 0);
  return r;
};
// Variante avec minutes pour des horaires plus réalistes
const heureMin = (d: Date, h: number, min: number) => {
  const r = new Date(d);
  r.setHours(h, min, 0, 0);
  return r;
};

async function main() {
  console.log('🌱 Nettoyage de la base...');
  // Ordre respectant les clés étrangères
  await prisma.commande_Produit.deleteMany();
  await prisma.commande.deleteMany();
  await prisma.produit_Panier.deleteMany();
  await prisma.panier.deleteMany();
  await prisma.produit.deleteMany();
  await prisma.type_Produit.deleteMany();
  await prisma.participation.deleteMany();
  await prisma.creneau.deleteMany();
  await prisma.utilisateur.deleteMany();

  console.log('👤 Création des utilisateurs...');
  const motDePasse = await bcrypt.hash(MOT_DE_PASSE, SALT);

  const utilisateursData = [
    {
      prenom: 'Remi',
      nom: 'Abdallah',
      email: 'remi@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'ADMIN' as const,
    },
    {
      prenom: 'Pierre',
      nom: 'Nouhet',
      email: 'pierre@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'ADMIN' as const,
    },
    {
      prenom: 'Matthieu',
      nom: 'Flament',
      email: 'matthieu@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'ADMIN' as const,
    },
    {
      prenom: 'Chloe',
      nom: 'Test',
      email: 'chloe@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'USER' as const,
    },
    {
      prenom: 'Claude',
      nom: 'Test',
      email: 'claude@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'USER' as const,
    },
    {
      prenom: 'Opus',
      nom: 'Test',
      email: 'opus@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'USER' as const,
    },
    {
      prenom: 'Sonnet',
      nom: 'Test',
      email: 'sonnet@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'USER' as const,
    },
    {
      prenom: 'Fable',
      nom: 'Test',
      email: 'fable@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'USER' as const,
    },
    {
      prenom: 'Mythos',
      nom: 'Test',
      email: 'mythos@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'USER' as const,
    },
    {
      prenom: 'GPT',
      nom: 'Test',
      email: 'gpt@exemple.fr',
      adresse: '1 rue coopcot',
      codePostal: '94000',
      ville: 'Créteil',
      role: 'USER' as const,
    },
  ];

  const utilisateurs = [];
  for (const u of utilisateursData) {
    utilisateurs.push(
      await prisma.utilisateur.create({ data: { ...u, motDePasse } }),
    );
  }

  console.log('📅 Création des créneaux...');
  const creneauxData = [
    {
      nom: 'Atelier étiquette',
      description: 'Étiquetage des produits en vrac',
      capacite: 4,
      offset: 1,
      h: 9,
    },
    {
      nom: 'Mise en rayon',
      description: 'Réapprovisionnement des étagères',
      capacite: 6,
      offset: 1,
      h: 14,
    },
    {
      nom: 'Inventaire',
      description: 'Comptage mensuel des stocks',
      capacite: 5,
      offset: 2,
      h: 10,
    },
    {
      nom: 'Réception livraison',
      description: 'Déchargement et contrôle des palettes',
      capacite: 3,
      offset: 3,
      h: 8,
    },
    {
      nom: 'Nettoyage du local',
      description: 'Entretien général de la coopérative',
      capacite: 4,
      offset: 3,
      h: 18,
    },
    {
      nom: 'Permanence caisse',
      description: 'Tenue de la caisse et accueil',
      capacite: 2,
      offset: 4,
      h: 9,
    },
    {
      nom: 'Préparation des paniers',
      description: 'Composition des paniers hebdomadaires',
      capacite: 6,
      offset: 5,
      h: 7,
    },
    {
      nom: 'Gestion des stocks',
      description: 'Rangement et rotation des produits',
      capacite: 4,
      offset: 6,
      h: 15,
    },
    {
      nom: 'Accueil des adhérents',
      description: 'Information et inscription des nouveaux membres',
      capacite: 3,
      offset: 7,
      h: 10,
    },
    {
      nom: 'Tri des invendus',
      description: 'Tri et redistribution des invendus',
      capacite: 5,
      offset: 8,
      h: 17,
    },
  ];

  const creneaux = [];
  for (let i = 0; i < creneauxData.length; i++) {
    const c = creneauxData[i];
    // Un jour distinct par créneau (i + 1 jours dans le futur)
    const dateDebut = heure(dans(i + 1), c.h);
    const dateFin = heure(dans(i + 1), c.h + 2);
    creneaux.push(
      await prisma.creneau.create({
        data: {
          nom: c.nom,
          description: c.description,
          capacite: c.capacite,
          dateDebut,
          dateFin,
        },
      }),
    );
  }

  console.log('📅 Créneaux supplémentaires (horaires variés)...');
  // Créneaux avec des horaires non ronds et des durées variables
  const creneauxVariesData = [
    {
      nom: 'Marché de producteurs',
      description: 'Tenue du stand au marché du samedi matin',
      capacite: 8,
      offset: 9,
      h: 8,
      min: 30,
      duree: 4,
    },
    {
      nom: 'Distribution AMAP',
      description: 'Remise des paniers aux adhérents AMAP',
      capacite: 4,
      offset: 10,
      h: 17,
      min: 45,
      duree: 2,
    },
    {
      nom: 'Atelier conserves',
      description: 'Transformation des légumes de saison en bocaux',
      capacite: 6,
      offset: 12,
      h: 14,
      min: 15,
      duree: 3,
    },
    {
      nom: 'Permanence du soir',
      description: 'Ouverture exceptionnelle en nocturne',
      capacite: 3,
      offset: 14,
      h: 19,
      min: 30,
      duree: 2,
    },
    {
      nom: 'Réunion des bénévoles',
      description: 'Point mensuel sur la vie de la coopérative',
      capacite: 12,
      offset: 16,
      h: 12,
      min: 0,
      duree: 1,
    },
  ];

  for (const c of creneauxVariesData) {
    const dateDebut = heureMin(dans(c.offset), c.h, c.min);
    const dateFin = heureMin(dans(c.offset), c.h + c.duree, c.min);
    creneaux.push(
      await prisma.creneau.create({
        data: {
          nom: c.nom,
          description: c.description,
          capacite: c.capacite,
          dateDebut,
          dateFin,
        },
      }),
    );
  }

  console.log('🤝 Création des participations...');
  for (let i = 0; i < 10; i++) {
    await prisma.participation.create({
      data: {
        utilisateurId: utilisateurs[i].id,
        creneauId: creneaux[i].id,
        // Un jour distinct par participation (i + 1 jours dans le passé)
        dateCreation: dans(-(i + 1)),
      },
    });
  }

  console.log('🤝 Participations supplémentaires pour Remi Abdallah...');
  const remi = utilisateurs[0];
  // Remi participe déjà au créneau 0 ; on l'ajoute à plusieurs autres,
  // chacune inscrite un jour différent
  // Mélange de créneaux d'origine (1, 2, 3, 5, 7) et des nouveaux
  // créneaux variés (10 = Marché, 11 = AMAP, 12 = Conserves, 14 = Réunion)
  const creneauxRemi = [1, 2, 3, 5, 7, 10, 11, 12, 14];
  // Inscriptions étalées sur des jours et des heures différents
  const inscriptionsRemi = [11, 13, 16, 18, 21, 24, 27, 30, 33];
  for (let j = 0; j < creneauxRemi.length; j++) {
    await prisma.participation.create({
      data: {
        utilisateurId: remi.id,
        creneauId: creneaux[creneauxRemi[j]].id,
        dateCreation: heureMin(
          dans(-inscriptionsRemi[j]),
          8 + ((j * 3) % 12),
          (j * 17) % 60,
        ),
      },
    });
  }

  console.log('🥕 Création des types de produits...');
  const typesData = [
    {
      nom: 'Courgettes',
      quantiteMax: 50,
      unite: 'VRAC' as const,
      prix: 2.4,
      ean: '3000000000017',
    },
    {
      nom: 'Tomates anciennes',
      quantiteMax: 40,
      unite: 'VRAC' as const,
      prix: 3.9,
      ean: '3000000000024',
    },
    {
      nom: 'Tomates grappes',
      quantiteMax: 60,
      unite: 'VRAC' as const,
      prix: 2.95,
      ean: '3000000000031',
    },
    {
      nom: 'Pommes de terre',
      quantiteMax: 100,
      unite: 'VRAC' as const,
      prix: 1.8,
      ean: '3000000000048',
    },
    {
      nom: 'Carottes',
      quantiteMax: 80,
      unite: 'VRAC' as const,
      prix: 1.6,
      ean: '3000000000055',
    },
    {
      nom: 'Oignons jaunes',
      quantiteMax: 70,
      unite: 'VRAC' as const,
      prix: 1.5,
      ean: '3000000000062',
    },
    {
      nom: 'Riz de Camargue 1kg',
      quantiteMax: 30,
      unite: 'UNITE' as const,
      prix: 3.2,
      ean: '3000000000079',
    },
    {
      nom: 'Lentilles vertes 500g',
      quantiteMax: 25,
      unite: 'UNITE' as const,
      prix: 2.7,
      ean: '3000000000086',
    },
    {
      nom: 'Miel de lavande 250g',
      quantiteMax: 20,
      unite: 'UNITE' as const,
      prix: 6.5,
      ean: '3000000000093',
    },
    {
      nom: 'Œufs bio (boîte de 6)',
      quantiteMax: 35,
      unite: 'UNITE' as const,
      prix: 2.85,
      ean: '3000000000109',
    },
    {
      nom: 'Pommes Gala 1kg',
      quantiteMax: 60,
      unite: 'UNITE' as const,
      prix: 2.6,
      ean: '3000000000116',
    },
    {
      nom: 'Bananes',
      quantiteMax: 55,
      unite: 'VRAC' as const,
      prix: 1.95,
      ean: '3000000000123',
    },
    {
      nom: 'Fromage de chèvre',
      quantiteMax: 25,
      unite: 'UNITE' as const,
      prix: 4.2,
      ean: '3000000000130',
    },
    {
      nom: 'Pain complet',
      quantiteMax: 40,
      unite: 'UNITE' as const,
      prix: 2.3,
      ean: '3000000000147',
    },
    {
      nom: 'Épinards frais',
      quantiteMax: 45,
      unite: 'VRAC' as const,
      prix: 2.8,
      ean: '3000000000154',
    },
    {
      nom: 'Confiture de fraises 350g',
      quantiteMax: 30,
      unite: 'UNITE' as const,
      prix: 4.5,
      ean: '3000000000161',
    },

    {
      nom: "huile d'olive",
      quantiteMax: 30,
      unite: 'UNITE' as const,
      prix: 24,
      ean: '8421555331005',
    },
  ];

  const types = [];
  for (const t of typesData) {
    types.push(await prisma.type_Produit.create({ data: t }));
  }

  console.log('📦 Création des produits (lots)...');
  const produits = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    produits.push(
      await prisma.produit.create({
        data: {
          typeProduitId: type.id,
          quantite: Math.round(type.quantiteMax * 0.6),
          dateArrive: dans(-2),
          datePeremption: dans(type.unite === 'VRAC' ? 7 : 90),
        },
      }),
    );
  }

  console.log('🛒 Création des paniers...');
  const paniers = [];
  for (let i = 0; i < 10; i++) {
    paniers.push(
      await prisma.panier.create({
        data: {
          utilisateurId: utilisateurs[i].id,
          prix: 0,
          // Un jour distinct par panier (i + 1 jours dans le passé)
          dateCreation: dans(-(i + 1)),
        },
      }),
    );
  }

  console.log('➕ Création des lignes de panier...');
  for (let i = 0; i < 10; i++) {
    const produit = produits[i];
    const type = types[i];
    const quantite = type.unite === 'VRAC' ? 1.5 : 2;
    const prix = Number((quantite * type.prix).toFixed(2));
    await prisma.produit_Panier.create({
      data: {
        panierId: paniers[i].id,
        produitId: produit.id,
        quantite,
        unite: type.unite,
        prix,
      },
    });
    await prisma.panier.update({
      where: { id: paniers[i].id },
      data: { prix },
    });
  }

  console.log('🛒 Paniers supplémentaires pour Remi Abdallah...');
  // Chaque panier liste ses lignes { type/produit, quantité } et la date/heure
  // de création. Le prix total est recalculé à partir des lignes.
  const paniersRemiData = [
    {
      // Panier "légumes de la semaine" : beaucoup de vrac
      lignes: [
        { i: 0, quantite: 2 }, // Courgettes
        { i: 2, quantite: 1.25 }, // Tomates grappes
        { i: 4, quantite: 3 }, // Carottes
      ],
      jours: 11,
      h: 9,
      min: 20,
    },
    {
      // Panier "épicerie sèche" : produits à l'unité
      lignes: [
        { i: 3, quantite: 2.5 }, // Pommes de terre
        { i: 6, quantite: 1 }, // Riz de Camargue
        { i: 9, quantite: 2 }, // Œufs bio
      ],
      jours: 14,
      h: 18,
      min: 5,
    },
    {
      // Petit panier "apéro / cadeau"
      lignes: [
        { i: 1, quantite: 0.75 }, // Tomates anciennes
        { i: 7, quantite: 1 }, // Lentilles vertes
        { i: 8, quantite: 1 }, // Miel de lavande
      ],
      jours: 18,
      h: 11,
      min: 45,
    },
    {
      // Gros panier familial varié
      lignes: [
        { i: 3, quantite: 4 }, // Pommes de terre
        { i: 5, quantite: 2 }, // Oignons jaunes
        { i: 0, quantite: 1.5 }, // Courgettes
        { i: 9, quantite: 3 }, // Œufs bio
      ],
      jours: 23,
      h: 8,
      min: 30,
    },
    {
      // Panier "garde-manger" : conserves et épicerie
      lignes: [
        { i: 7, quantite: 3 }, // Lentilles vertes
        { i: 6, quantite: 2 }, // Riz de Camargue
        { i: 8, quantite: 2 }, // Miel de lavande
      ],
      jours: 29,
      h: 16,
      min: 50,
    },
    {
      // Panier "petit-déjeuner" : fruits, pain et confiture
      lignes: [
        { i: 10, quantite: 2 }, // Pommes Gala
        { i: 11, quantite: 1.5 }, // Bananes
        { i: 13, quantite: 1 }, // Pain complet
        { i: 15, quantite: 1 }, // Confiture de fraises
      ],
      jours: 34,
      h: 7,
      min: 40,
    },
    {
      // Panier "plateau fromage & verdure"
      lignes: [
        { i: 12, quantite: 2 }, // Fromage de chèvre
        { i: 14, quantite: 2.5 }, // Épinards frais
        { i: 13, quantite: 1 }, // Pain complet
        { i: 1, quantite: 1 }, // Tomates anciennes
      ],
      jours: 38,
      h: 19,
      min: 15,
    },
  ];
  for (const data of paniersRemiData) {
    const panier = await prisma.panier.create({
      data: {
        utilisateurId: remi.id,
        prix: 0,
        dateCreation: heureMin(dans(-data.jours), data.h, data.min),
      },
    });
    let total = 0;
    for (const ligne of data.lignes) {
      const type = types[ligne.i];
      const prix = Number((ligne.quantite * type.prix).toFixed(2));
      total += prix;
      await prisma.produit_Panier.create({
        data: {
          panierId: panier.id,
          produitId: produits[ligne.i].id,
          quantite: ligne.quantite,
          unite: type.unite,
          prix,
        },
      });
    }
    await prisma.panier.update({
      where: { id: panier.id },
      data: { prix: Number(total.toFixed(2)) },
    });
  }

  console.log('🧾 Création des commandes...');
  const commandes = [];
  for (let i = 0; i < 10; i++) {
    commandes.push(
      await prisma.commande.create({
        data: { utilisateurId: utilisateurs[i].id },
      }),
    );
  }

  console.log('📋 Création des lignes de commande...');
  for (let i = 0; i < 10; i++) {
    await prisma.commande_Produit.create({
      data: {
        commandeId: commandes[i].id,
        typeProduitId: types[i].id,
        quantite: types[i].unite === 'VRAC' ? 2 : 3,
      },
    });
  }

  console.log('\n✅ Base peuplée avec succès !');
  console.log(
    `   - ${utilisateurs.length} utilisateurs (mot de passe : ${MOT_DE_PASSE})`,
  );
  console.log(
    `   - ${creneaux.length} créneaux, ${types.length} types de produits, ${produits.length} produits`,
  );
  console.log('\n   Comptes de connexion :');
  utilisateursData.forEach((u) => console.log(`   • ${u.email} (${u.role})`));
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
