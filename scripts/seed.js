const { db } = require('@vercel/postgres');
require('dotenv').config();
const { fetchVinos, insertVinos } = require('../app/lib/data.js');
const bcrypt = require('bcrypt');

async function seedVinos(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS vinos (
        id SERIAL PRIMARY KEY,
        winery VARCHAR(255) NOT NULL,
        wine VARCHAR(255) NOT NULL,
        average_rating DECIMAL(3, 2) NOT NULL,
        reviews VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        price DECIMAL(5, 2) NOT NULL
      );
    `;

    console.log(`Created "vinos" table`);

    const vinos = await fetchVinos();
    await insertVinos(vinos);

    console.log(`Seeded ${vinos.length} vinos`);

    return {
      createTable,
      vinos,
    };
  } catch (error) {
    console.error('Error seeding vinos:', error);
    throw error;
  }
}

(async () => {
  const client = await db.connect();
  try {
    await seedVinos(client);
  } finally {
    client.release();
  }
})();
