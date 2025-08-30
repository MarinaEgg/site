// test-gmail-quick.js - Test Gmail EggOn Technology (version corrigée)
const nodemailer = require('nodemailer');

async function testGmail() {
  console.log('🧪 Test Gmail EggOn Technology');
  console.log('================================');
  
  // Configuration Gmail directe
  const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'eggoncontact@gmail.com',
      pass: 'mkpdqetxouxhkyce'
    }
  });
  
  try {
    console.log('🔄 Test connexion Gmail...');
    await transporter.verify();
    console.log('✅ Connexion Gmail réussie !');
    
    console.log('📧 Envoi email de test...');
    const info = await transporter.sendMail({
      from: '"EggOn Technology" <contact@eggon-technology.com>',
      to: 'eggoncontact@gmail.com',
      subject: '🧪 Test Gmail - EggOn Technology',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f9fa;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2f2f2e; text-align: center;">🎉 Gmail Configuration Réussie !</h2>
            <p style="color: #333; line-height: 1.6;">
              Votre configuration Gmail fonctionne parfaitement !
            </p>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #333;"><strong>Configuration testée :</strong></p>
              <p style="margin: 5px 0; color: #666;">📧 Serveur : smtp.gmail.com</p>
              <p style="margin: 5px 0; color: #666;">👤 Compte : eggoncontact@gmail.com</p>
              <p style="margin: 5px 0; color: #666;">🏢 Affiché comme : contact@eggon-technology.com</p>
              <p style="margin: 5px 0; color: #666;">📅 Date : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
            <p style="text-align: center; margin: 30px 0;">
              <strong style="color: #28a745;">✅ Prêt pour Vercel !</strong>
            </p>
          </div>
        </div>
      `
    });
    
    console.log('✅ Email envoyé avec succès !');
    console.log('📧 Message ID:', info.messageId);
    console.log('');
    console.log('🎯 Vérifiez votre Gmail : eggoncontact@gmail.com');
    console.log('📬 L\'email devrait apparaître comme venant de : contact@eggon-technology.com');
    console.log('');
    console.log('🚀 Configuration Gmail prête pour Vercel !');
    
  } catch (error) {
    console.log('❌ Erreur Gmail:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('');
      console.log('💡 Problème d\'authentification Gmail :');
      console.log('   1. Vérifiez que la vérification 2-étapes est activée');
      console.log('   2. Régénérez un nouveau mot de passe d\'application');
      console.log('   3. Utilisez le nouveau mot de passe dans .env');
    } else if (error.code === 'ECONNECTION') {
      console.log('');
      console.log('💡 Problème de connexion :');
      console.log('   1. Vérifiez votre connexion internet');
      console.log('   2. Gmail peut temporairement bloquer la connexion');
    }
  }
}

// Lancer le test
testGmail();
