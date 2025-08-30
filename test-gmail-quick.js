const nodemailer = require('nodemailer');

console.log('🧪 Test Gmail EggOn Technology');
console.log('================================');

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'eggoncontact@gmail.com',
    pass: 'mkpdqetxouxhkyce'
  }
};

async function test() {
  try {
    const transporter = nodemailer.createTransporter(config);
    
    console.log('🔄 Test connexion...');
    await transporter.verify();
    console.log('✅ Connexion OK !');
    
    console.log('📧 Envoi test...');
    const result = await transporter.sendMail({
      from: '"EggOn Technology" <contact@eggon-technology.com>',
      to: 'eggoncontact@gmail.com',
      subject: 'Test Gmail',
      text: 'Test réussi !'
    });
    
    console.log('✅ Email envoyé ! ID:', result.messageId);
    console.log('🎯 Vérifiez votre Gmail !');
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

test();
