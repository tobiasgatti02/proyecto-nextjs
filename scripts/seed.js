const { db } = require('@vercel/postgres');
require('dotenv').config();
const {
  vinos,
  users,
} = require('../app/lib/placeholder-data.js');
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
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
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
      // Create the "vinos" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS vinos (
          id SERIAL PRIMARY KEY,
          winery VARCHAR(255) NOT NULL,
          wine VARCHAR(255) NOT NULL,
          average_rating DECIMAL(3, 2) NOT NULL,
          reviews VARCHAR(255) NOT NULL,
          location VARCHAR(255) NOT NULL,
          image TEXT NOT NULL,
          type VARCHAR(50) NOT NULL
        );
      `;
  
      console.log(`Created "vinos" table`);
    console.log(vinos.flat());
      // Insert data into the "vinos" table
      const insertedWines = await Promise.all(
        vinos.flat().map(async (wine) => {
          return client.sql`
            INSERT INTO vinos (winery, wine, average_rating, reviews, location, image, type)
            VALUES (${wine.winery}, ${wine.wine}, ${wine.rating.average}, ${wine.rating.reviews}, ${wine.location}, ${wine.image}, ${wine.type})
            ON CONFLICT (id) DO NOTHING;
          `;
        }),
      );
  
      console.log(`Seeded ${insertedWines.length} wines`);
  
      return {
        createTable,
        vinos: insertedWines,
      };
    } catch (error) {
      console.error('Error seeding vinos:', error);
      throw error;
    }
  }
  
  

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedVinos(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
