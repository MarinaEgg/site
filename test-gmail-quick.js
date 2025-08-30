// test-gmail-quick.js - Test rapide Gmail pour EggOn Technology
import { sendEmailWithNodemailer } from './src/api/email-config.js';

// Configuration des variables d'environnement pour le test
process.env.SMTP_HOST = 'smtp.gmail.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_USER = 'eggoncontact@gmail.com';
process.env.SMTP_PASS = 'mkpdqetxouxhkyce';
process.env.FROM_EMAIL = 'contact@eggon-technology.com';
process.env.FROM_NAME = 'EggOn Technology';

async function testGmailConfiguration() {
  console.log('🧪 Test de configuration Gmail - EggOn Technology');
  console.log('=' .repeat(50));
  
  console.log('📧 Configuration :');
  console.log(`   Serveur SMTP: ${process.env.SMTP_HOST}`);
  console.log(`   Port: ${process.env.SMTP_PORT}`);
  console.log(`   Compte Gmail: ${process.env.SMTP_USER}`);
  console.log(`   Affiché comme: ${process.env.FROM_EMAIL}`);
  console.log('');
  
  // Email de test
  const testEmail = {
    to: 'eggoncontact@gmail.com', // Test à soi-même
    subject: '🧪 Test Gmail - EggOn Technology Configuration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #fce96b 0%, #f0d943 100%); padding: 30px; text-align: center;">
          <h1 style="color: #2f2f2e; margin: 0; font-size: 28px;">🎉 Configuration Gmail Réussie !</h1>
          <p style="color: #2f2f2e; margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">EggOn Technology</p>
        </div>
        
        <div style="background: white; padding: 30px;">
          <h2 style="color: #2f2f2e; margin: 0 0 20px 0;">Test de configuration Gmail</h2>
          
          <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #2f2f2e; margin: 0 0 15px 0;">✅ Configuration validée :</h3>
            <div style="color: #333; line-height: 1.8;">
              <p style="margin: 5px 0;">📧 <strong>Serveur SMTP :</strong> ${process.env.SMTP_HOST}</p>
              <p style="margin: 5px 0;">🔌 <strong>Port :</strong> ${process.env.SMTP_PORT}</p>
              <p style="margin: 5px 0;">👤 <strong>Compte Gmail :</strong> ${process.env.SMTP_USER}</p>
              <p style="margin: 5px 0;">🏢 <strong>Affiché comme :</strong> ${process.env.FROM_EMAIL}</p>
              <p style="margin: 5px 0;">📅 <strong>Date du test :</strong> ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #fce96b; margin: 20px 0;">
            <h3 style="color: #2f2f2e; margin: 0 0 15px 0;">🚀 Prêt pour la production :</h3>
            <div style="color: #333; line-height: 1.8;">
              <p style="margin: 8px 0;">✅ Connexion Gmail validée</p>
              <p style="margin: 8px 0;">✅ Envoi d'emails fonctionnel</p>
              <p style="margin: 8px 0;">✅ Adresse professionnelle configurée</p>
              <p style="margin: 8px 0;">✅ Système de devis opérationnel</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0 0 15px 0; color: #333; font-size: 16px;"><strong>🎯 Étapes suivantes :</strong></p>
            <p style="margin: 5px 0; color: #666;">1. Déployer sur Vercel</p>
            <p style="margin: 5px 0; color: #666;">2. Configurer les variables d'environnement</p>
            <p style="margin: 5px 0; color: #666;">3. Tester le formulaire de contact</p>
          </div>
        </div>
        
        <div style="padding: 20px; text-align: center; color: #666; font-size: 12px; background: #f8f9fa;">
          EggOn Technology - Configuration Email Test<br>
          Si vous recevez cet email, votre configuration Gmail fonctionne parfaitement !
        </div>
      </div>
    `
  };
  
  try {
    console.log('🔄 Tentative d\'envoi de l\'email de test...');
    console.log('');
    
    const result = await sendEmailWithNodemailer(testEmail);
    
    if (result.success) {
      console.log('🎉 SUCCÈS ! Email envoyé avec succès !');
      console.log('');
      console.log('✅ Détails :');
      console.log(`   Message ID: ${result.messageId}`);
      if (result.response) {
        console.log(`   Réponse serveur: ${result.response}`);
      }
      console.log('');
      console.log('📬 Vérifiez votre boîte Gmail : eggoncontact@gmail.com');
      console.log('   L\'email devrait apparaître comme venant de : contact@eggon-technology.com');
      console.log('');
      console.log('🚀 Configuration Gmail prête pour Vercel !');
      return true;
    } else {
      console.log('❌ ERREUR lors de l\'envoi :');
      console.log(`   Erreur: ${result.error}`);
      if (result.userMessage) {
        console.log(`   Message: ${result.userMessage}`);
      }
      if (result.code) {
        console.log(`   Code: ${result.code}`);
      }
      return false;
    }
    
  } catch (error) {
    console.log('💥 ERREUR inattendue :');
    console.log(`   ${error.message}`);
    console.log('');
    console.log('🔧 Vérifications suggérées :');
    console.log('   1. Mot de passe d\'application Gmail correct');
    console.log('   2. Vérification 2-étapes activée sur Gmail');
    console.log('   3. Compte Gmail eggoncontact@gmail.com accessible');
    return false;
  }
}

// Lancer le test
testGmailConfiguration()
  .then(success => {
    if (success) {
      console.log('');
      console.log('=' .repeat(50));
      console.log('🏆 TEST RÉUSSI - CONFIGURATION GMAIL OK !');
      console.log('🎯 Prochaine étape : Configuration Vercel');
      process.exit(0);
    } else {
      console.log('');
      console.log('=' .repeat(50));
      console.log('❌ TEST ÉCHOUÉ - Vérifiez la configuration');
      console.log('💡 Besoin d\'aide ? Vérifiez le mot de passe d\'application Gmail');
      process.exit(1);
    }
  })
  .catch(error => {
    console.log('💥 Erreur lors du test :', error.message);
    process.exit(1);
  });
