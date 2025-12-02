const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const SALT_ROUNDS = 10;

// Read db.json
const dbPath = path.join(__dirname, '..', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Hash the admin password
const hashAdminPassword = async () => {
  const plainPassword = 'makueni2013'; // Current password
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  
  // Update admin password
  db.admin.password = hashedPassword;
  
  // Write back to db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  
  console.log('✅ Admin password has been hashed successfully!');
  console.log('📧 Email: anthonymaundu1@gmail.com');
  console.log('🔑 Password: makueni2013');
  console.log('🔒 Hashed Password:', hashedPassword);
};

hashAdminPassword().catch(console.error);
