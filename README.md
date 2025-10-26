
## Présentation
JPWebsite est un prototype qui peut être réutilisé, d'une revue web pour l'association étudiante Juvenis Prudentia (RNA:W372019882) 

Le site contient les éléments suivant : 
- S'enregistrer et se connecter pour avoir accès à l'écriture d'article
- Page d'accueil ouvrant sur tout les articles triables par tag
- Onglet Carte où un planisphère interactive contient des indicateurs socio-économiques pertinents
- <img width="1015" height="628" alt="image" src="https://github.com/user-attachments/assets/8957d98c-3074-4006-bfdb-79696f21e753" />
-<img width="682" height="623" alt="image" src="https://github.com/user-attachments/assets/13566062-d678-420f-84e6-3da10b2f39eb" />
- En cliquant sur le nom du pays en intitulé, l'accès aux institutions principales du pays sont accessible 
- <img width="399" height="730" alt="image" src="https://github.com/user-attachments/assets/926af738-1fab-4ac3-b653-f1cf20bd45c0" />



### Comment lancer le prototype ?

1. Clonez le repository : git clone 
2. Installez les dépendances:

```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

**Important**: Remplacez `username`, `password`, `cluster`, et `database_name` par vos credentials MongoDB Atlas.

### Configuration MongoDB Atlas

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un nouveau cluster (gratuit disponible)
3. Créez un utilisateur de base de données (Database Access)
4. Configurez l'accès réseau (Network Access):
   - Ajoutez votre IP locale pour le développement
   - Ou ajoutez `0.0.0.0/0` pour autoriser toutes les IP (attention: sécurisez vos credentials)
5. Obtenez votre connection string (Connect -> Connect your application)
6. Ajoutez-le dans le fichier `.env.local`

### Démarrage du serveur

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Dépannage MongoDB

### Erreur ENOTFOUND

Cette erreur indique que MongoDB Atlas ne peut pas être atteint. Solutions possibles:

1. **Vérifiez votre connection string**: Assurez-vous que votre URI MongoDB est correcte
2. **Vérifiez l'accès réseau**: Votre IP doit être autorisée dans MongoDB Atlas (Network Access)
3. **Vérifiez les credentials**: Le nom d'utilisateur et le mot de passe doivent être corrects
4. **Vérifiez le cluster**: Le cluster MongoDB doit être actif (non suspendu)

### Erreur de timeout

Si vous obtenez des timeouts:
- Vérifiez votre connexion Internet
- Vérifiez que le cluster MongoDB est actif
- Augmentez les timeouts dans `src/lib/config/db.js` si nécessaire

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

