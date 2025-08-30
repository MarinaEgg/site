# Composant AgentCard - Guide d'utilisation

## 📋 Description

Le composant `AgentCard` est une carte réutilisable qui permet aux utilisateurs de demander un devis personnalisé pour un agent IA. Il inclut :

- ✅ Affichage des informations de l'agent (titre + description)
- ✅ Champ de saisie avec animation "machine à écrire"
- ✅ Champ email client avec validation
- ✅ Message de confidentialité rassurant
- ✅ Bouton de demande de devis avec effet de survol
- ✅ Envoi automatique d'email à m.jacquet@eggon.fr ET au client
- ✅ Message de confirmation
- ✅ Design cohérent avec le site EggOn

## 🚀 Installation

### 1. Dépendances requises

```bash
npm install nodemailer @sendgrid/mail
# ou
yarn add nodemailer @sendgrid/mail
```

### 2. Configuration des variables d'environnement

Créez un fichier `.env` à la racine de votre projet :

```env
# Configuration email (choisir une option)

# Option 1: Nodemailer avec Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application

# Option 2: SendGrid (recommandé)
SENDGRID_API_KEY=votre-clé-api-sendgrid

# Configuration générale
FROM_EMAIL=noreply@eggon.fr
FROM_NAME=EggOn Technology
NODE_ENV=production
```

### 3. Configuration de l'API

Pour **Next.js**, créez le fichier `pages/api/quote.js` :

```javascript
import { sendEmailWithNodemailer } from '../../src/api/email-config';

export default async function handler(req, res) {
  // Copiez le contenu de src/api/quote.js
}
```

Pour **Express.js**, ajoutez la route dans votre serveur :

```javascript
app.post('/api/quote', async (req, res) => {
  // Copiez la logique de src/api/quote.js
});
```

## 📖 Utilisation

### Import du composant

```javascript
import AgentCard from './components/collection/AgentCard';
```

### Utilisation basique

```javascript
<AgentCard
  title="Agent Juridique Spécialisé"
  description="Analyse de contrats et recherche jurisprudentielle automatisée"
  onQuoteRequest={(data) => console.log('Demande reçue:', data)}
/>
```

### Utilisation avec traductions

```javascript
<AgentCard
  title={t('agents.legal.title')}
  description={t('agents.legal.description')}
  onQuoteRequest={handleQuoteRequest}
  className="custom-agent-card"
/>
```

### Grille de cartes

```javascript
<div className="agent-cards-grid">
  {agents.map((agent, index) => (
    <AgentCard
      key={index}
      title={agent.title}
      description={agent.description}
      onQuoteRequest={handleQuoteRequest}
    />
  ))}
</div>
```

## 🎨 Personnalisation

### Props disponibles

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `title` | string | ✅ | Titre de l'agent |
| `description` | string | ✅ | Description de l'agent |
| `onQuoteRequest` | function | ❌ | Callback lors de l'envoi (reçoit: agentTitle, userRequirement, clientEmail) |
| `className` | string | ❌ | Classes CSS supplémentaires |

### Styles personnalisés

```css
/* Personnaliser la couleur du bouton */
.custom-agent-card .quote-button {
  border-color: #your-color;
  color: #your-color;
}

.custom-agent-card .quote-button:hover {
  background: #your-color;
}
```

## 🔧 Configuration avancée

### Personnaliser l'animation du placeholder

```css
.agent-card .user-input::placeholder {
  animation: custom-blink 2s infinite;
}

@keyframes custom-blink {
  0%, 70% { opacity: 1; }
  71%, 100% { opacity: 0.3; }
}
```

### Modifier le texte de l'animation

Dans `AgentCard.js`, modifiez :

```javascript
const typewriterText = "votre texte personnalisé...";
```

### Ajouter des champs supplémentaires

```javascript
// Dans le composant AgentCard
const [companyName, setCompanyName] = useState('');
const [contactEmail, setContactEmail] = useState('');

// Dans le formulaire
<input
  type="text"
  placeholder="Nom de l'entreprise"
  value={companyName}
  onChange={(e) => setCompanyName(e.target.value)}
  className="user-input"
/>
```

## 📧 Configuration email

Le système envoie **deux emails automatiquement** :
1. **Email interne** à m.jacquet@eggon.fr avec les détails de la demande
2. **Email de confirmation** au client avec récapitulatif et prochaines étapes

### Option 1: Gmail avec Nodemailer

1. Activez l'authentification à 2 facteurs sur Gmail
2. Générez un mot de passe d'application
3. Utilisez ce mot de passe dans `SMTP_PASS`

### Option 2: SendGrid (recommandé)

1. Créez un compte SendGrid
2. Générez une clé API
3. Configurez `SENDGRID_API_KEY`

### Option 3: Serveur SMTP personnalisé

```env
SMTP_HOST=mail.votre-domaine.com
SMTP_PORT=587
SMTP_USER=noreply@votre-domaine.com
SMTP_PASS=votre-mot-de-passe
```

### 🔒 Confidentialité des données

- Message rassurant affiché : "Nous n'enverrons pas d'emails commerciaux"
- Validation format email côté client et serveur
- Email de confirmation professionnel envoyé au client
- Données client incluses dans l'email interne pour suivi

## 🐛 Dépannage

### Erreur "Method not allowed"
- Vérifiez que l'endpoint `/api/quote` existe
- Assurez-vous que la méthode POST est supportée

### Emails non reçus
- Vérifiez les variables d'environnement
- Consultez les logs du serveur
- Vérifiez le dossier spam

### Problème d'animation
- Vérifiez que les styles CSS sont bien importés
- Assurez-vous que `framer-motion` est installé

## 📱 Responsive

Le composant est entièrement responsive :
- Desktop: 400px de largeur fixe
- Tablet: Adaptation automatique
- Mobile: Pleine largeur avec bouton étendu

## 🌐 Internationalisation

Ajoutez les traductions dans vos fichiers i18n :

```json
{
  "agentCard": {
    "customTitle": "Description de l'agent souhaité si différent",
    "requestQuote": "Demande devis",
    "sending": "Envoi en cours...",
    "successMessage": "Votre demande a été envoyée"
  }
}
```

## 🔒 Sécurité

- Validation côté serveur des données
- Sanitisation des entrées utilisateur
- Rate limiting recommandé
- HTTPS obligatoire en production