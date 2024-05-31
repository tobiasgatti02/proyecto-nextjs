const { db } = require('@vercel/postgres');
require('dotenv').config();
const { fetchVinos, insertVinos } = require('../app/lib/dataSeed.js');
const users = require('../app/lib/placeholder-data.js').users;
const bcrypt = require('bcrypt');
async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password,role)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword},${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

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
    await seedUsers(client);
  } finally {
    client.release();
  }
})();
