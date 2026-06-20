# Toop'Coop Backend

Ce repository est une API pour les front mobile et web Top'Coop

## Installation et lancement

### Installation

```
git clone https://github.com/remabd/top-coop-back.git
cd top-coop-back
npm install
```
### Mise en place

Il faut créer un fichier .env avec les paramètres suivants:
```
DATABASE_URL="mysql://user:passwd@adresse:port/nom" (l'adresse de la base de donnée)
SALT=10
JWT_CONSTANT="" (une phrase de passe JWT)
```

Pour la base de donnée et Prisma:
```
npx prisma migrate deploy
npx prisma generate
npm run seed //Optionnel: Peuplement de la base de donnée avec des données d'entrainement
```
les mots de passe des utilisateurs créés par le seed sont `Test!1te`

### Lancement

```
npm run start
```
