Pour démarrer le serveur veuillez suivre les étapes suivantes:
Remarque les commandes sont à taper sans les " ".

Etape 1: Dans le dossier backend créer un fichier .env

Etape 2: Dans le fichier .env, compléter les paramètres suivants
avec vos identifiants vous permettant de vous connecter à votre base de donnée MongoDB:
TOKEN='//TOKEN'
MONGODB_CONNECT='mongodb+srv://votreMongoDb+srv'
Puis enregistrer.

Etape 3: Dans un terminal à partir du dossier frontend taper: "npm install" puis "npm start"

Etape 4: Dans un terminal à partir du dossier backend taper: "npm install" puis "npm start"

Etape 5: Se rendre sur  http://localhost:4200/

En ce qui concerne l'inscription, le mot de passe doit contenir:
- Une lettre majuscule
- Une lettre miniscule
- Un chiffre
- Un caractère spécial: ! @ # $ & *
- Un chiffre
- Un minimum de 8 caractères
