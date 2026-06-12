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
  for (const c of creneauxData) {
    const dateDebut = heure(dans(c.offset), c.h);
    const dateFin = heure(dans(c.offset), c.h + 2);
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
      },
    });
  }

  console.log('🥕 Création des types de produits...');
  const typesData = [
    { nom: 'Courgettes', quantiteMax: 50, unite: 'VRAC' as const, prix: 2.4 },
    {
      nom: 'Tomates anciennes',
      quantiteMax: 40,
      unite: 'VRAC' as const,
      prix: 3.9,
    },
    {
      nom: 'Tomates grappes',
      quantiteMax: 60,
      unite: 'VRAC' as const,
      prix: 2.95,
    },
    {
      nom: 'Pommes de terre',
      quantiteMax: 100,
      unite: 'VRAC' as const,
      prix: 1.8,
    },
    { nom: 'Carottes', quantiteMax: 80, unite: 'VRAC' as const, prix: 1.6 },
    {
      nom: 'Oignons jaunes',
      quantiteMax: 70,
      unite: 'VRAC' as const,
      prix: 1.5,
    },
    {
      nom: 'Riz de Camargue 1kg',
      quantiteMax: 30,
      unite: 'UNITE' as const,
      prix: 3.2,
    },
    {
      nom: 'Lentilles vertes 500g',
      quantiteMax: 25,
      unite: 'UNITE' as const,
      prix: 2.7,
    },
    {
      nom: 'Miel de lavande 250g',
      quantiteMax: 20,
      unite: 'UNITE' as const,
      prix: 6.5,
    },
    {
      nom: 'Œufs bio (boîte de 6)',
      quantiteMax: 35,
      unite: 'UNITE' as const,
      prix: 2.85,
    },
  ];

  const types = [];
  for (const t of typesData) {
    types.push(await prisma.type_Produit.create({ data: t }));
  }

  console.log('📦 Création des produits (lots)...');
  const produits = [];
  for (let i = 0; i < 10; i++) {
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
        data: { utilisateurId: utilisateurs[i].id, prix: 0 },
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
