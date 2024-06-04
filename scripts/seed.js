const { db } = require('@vercel/postgres');
require('dotenv').config();
const { fetchVinos, insertVinos } = require('../app/lib/dataSeed.js');
const { users } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();

  let type;
  if (endpoint === API_ENDPOINTS.reds) {
    type = 'red';
  } else if (endpoint === API_ENDPOINTS.whites) {
    type = 'white';
  } else if (endpoint === API_ENDPOINTS.rose) {
    type = 'rose';
  }

  return data
    .filter(wine => !wine.image.endsWith('.jpg') && !wine.image.endsWith('.svg'))
    .map(wine => ({
      id: wine.id,
      winery: wine.winery,
      wine: wine.wine,
      rating_average: parseFloat(wine.rating.average),
      rating_reviews: wine.rating.reviews,
      location: wine.location,
      image: wine.image,
      price: getRandomPrice(),
      wine_category: type
    }));
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
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

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, role)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    const adminPassword = await bcrypt.hash('admin', 10);
    await client.sql`
      INSERT INTO users (name, email, password, role)
      VALUES ('admin', 'admin@admin.com', ${adminPassword}, 'admin')
      ON CONFLICT (email) DO NOTHING;
    `;

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

async function seedWineCategories(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS wine_categories (
        wine_category VARCHAR(100) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL
      );
    `;

    console.log(`Created "wine_categories" table`);

    const categories = ['red', 'white', 'rose'];
    const insertedCategories = await Promise.all(
      categories.map(async (category) => {
        return client.sql`
        INSERT INTO wine_categories (wine_category, nombre)
        VALUES (${category}, ${category})
        ON CONFLICT (wine_category) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedCategories.length} wine categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error('Error seeding wine categories:', error);
    throw error;
  }
}

async function seedWines(client) {
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
        wine_category  VARCHAR(50) NOT NULL,
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
    //await seedUsers(client);
    //await seedWineCategories(client);
    //await seedWines(client);
  } finally {
    client.release();
  }
})();

/**
CREATE TABLE IF NOT EXISTS wine_categorys (
    wine_category VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS WINES (
    ID_WINE SERIAL PRIMARY KEY,
    WINERY VARCHAR(255) NOT NULL,
    WINE VARCHAR(255) NOT NULL,
    AVERAGE_RATING VARCHAR(10),
    REVIEWS INT,
    LOCATION VARCHAR(255),
    WINE_CATEGORY VARCHAR(100),
    PRICE INT,
    FOREIGN KEY (WINE_CATEGORY) REFERENCES WINE_CATEGORIES (WINE_CATEGORY)
);

CREATE TABLE IF NOT EXISTS IMAGES (
    ID_IMAGE SERIAL PRIMARY KEY,
    IMAGE_URL TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS WINE_IMAGES (
    ID_WINE INT,
    ID_IMAGE INT,
    PRIMARY KEY (ID_WINE, ID_IMAGE),
    FOREIGN KEY (ID_WINE) REFERENCES WINES (ID_WINE),
    FOREIGN KEY (ID_IMAGE) REFERENCES IMAGES (ID_IMAGE)
);

CREATE TABLE IF NOT EXISTS ORDERS (
    ORDER_ID SERIAL PRIMARY KEY,
    ORDER_DATE DATE NOT NULL,
    ORDER_HOUR TIME NOT NULL,
    DETAIL_ID INT NOT NULL,
    VALUE INT NOT NULL,
    STATE VARCHAR(50) NOT NULL,
    FOREIGN KEY (DETAIL_ID) REFERENCES ORDER_DETAILS (DETAIL_ID)
);

CREATE TABLE IF NOT EXISTS ORDER_DETAILS (
    DETAIL_ID SERIAL PRIMARY KEY,
    ORDER_ID
    ID_WINE INT,
    QUANTITY INT NOT NULL,
    PRICE INT NOT NULL,
    FOREIGN KEY (ID_WINE) REFERENCES WINES (ID_WINE),
    FOREIGN KEY (ORDER_ID) REFERENCES ORDERS (ORDER_ID)
);

CREATE TABLE IF NOT EXISTS USERS (
    USER_ID SERIAL PRIMARY KEY,
    ROLE VARCHAR(50) NOT NULL,
    EMAIL VARCHAR(255) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL
); 


*/