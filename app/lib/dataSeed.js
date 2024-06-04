const { db } = require('@vercel/postgres');
const { unstable_noStore: noStore } = require('next/cache');
require('dotenv').config();

const API_ENDPOINTS = {
  reds: 'https://api.sampleapis.com/wines/reds',
  whites: 'https://api.sampleapis.com/wines/whites',
  rose: 'https://api.sampleapis.com/wines/rose'
};

const getRandomPrice = () => (Math.random() * (50 - 10) + 10).toFixed(2);

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

async function fetchVinos() {
  try {
    noStore();
    const [reds, whites, rose] = await Promise.all([
      fetchData(API_ENDPOINTS.reds),
      fetchData(API_ENDPOINTS.whites),
      fetchData(API_ENDPOINTS.rose)
    ]);
    return [...reds, ...whites, ...rose];
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw new Error('Failed to fetch vinos.');
  }
}

async function getUser(email) {
  try {
    noStore();
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

async function insertVinos(vinos) {
  const MAX_RETRIES = 3;

  for (const vino of vinos) {
    let attempt = 0;
    let success = false;

    while (attempt < MAX_RETRIES && !success) {
      try {
        await db.query(`
          INSERT INTO vinos (winery, wine, average_rating, reviews, location, image, wine_category, price)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO NOTHING;
        `, [vino.winery, vino.wine, vino.rating_average, vino.rating_reviews, vino.location, vino.image, vino.wine_category, vino.price]);
        success = true;
      } catch (error) {
        attempt++;
        console.error(`Error inserting vino (attempt ${attempt}):`, error);
        if (attempt >= MAX_RETRIES) {
          throw new Error('Failed to insert vinos after multiple attempts.');
        }
      }
    }
  }

  console.log(`Inserted ${vinos.length} vinos`);
}


async function insertVino(vino, connectionString) {
  const MAX_RETRIES = 3;
  console.log(`Inserted vino: ${vino.wine}`);
  let attempt = 0;
  let success = false;

  console.log({
     POSTGRES_URL: process.env.POSTGRES_URL,
     POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
    });

  while (attempt < MAX_RETRIES && !success) {
    try {
      await db.query(`
        INSERT INTO vinos (winery, wine, average_rating, reviews, location, image, wine_category, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO NOTHING;
      `, [vino.winery, vino.wine, vino.rating_average, vino.rating_reviews, vino.location, vino.image, vino.wine_category, vino.price], { connectionString });
      success = true;
      console.log(`Inserted vino: ${vino.wine}`);
    } catch (error) {
      attempt++;
      console.error(`Error inserting vino (attempt ${attempt}):`, error);
      if (attempt >= MAX_RETRIES) {
        throw new Error('Failed to insert vino after multiple attempts.');
      }
    }
  }

  console.log(`Inserted vino: ${vino.wine}`);
}






module.exports = { fetchVinos, getUser, insertVinos, insertVino};
