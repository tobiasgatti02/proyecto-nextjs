// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const vinos = [
    [
        {
          "winery": "Maselva",
          "wine": "Emporda 2012",
          "rating": {
            "average": "4.9",
            "reviews": "88 ratings"
          },
          "location": "Spain\n·\nEmpordà",
          "image": "https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_375x500.jpg",
          "id": 1,
          "type": "red"
        },
        {
          "winery": "Ernesto Ruffo",
          "wine": "Amarone della Valpolicella Riserva N.V.",
          "rating": {
            "average": "4.9",
            "reviews": "75 ratings"
          },
          "location": "Italy\n·\nAmarone della Valpolicella",
          "image": "https://images.vivino.com/thumbs/nC9V6L2mQQSq0s-wZLcaxw_pb_x300.png",
          "id": 2,
          "type": "white"
        },
        {
          "winery": "Cartuxa",
          "wine": "Pêra-Manca Tinto 1990",
          "rating": {
            "average": "4.9",
            "reviews": "72 ratings"
          },
          "location": "Portugal\n·\nAlentejo",
          "image": "https://images.vivino.com/thumbs/L33jsYUuTMWTMy3KoqQyXg_pb_x300.png",
          "id": 3,
          "type": "rose"
        }
      ]
      
  ];
  
  const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        role: 'admin'
      },
      {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'bodine',
        email: 'a@a.com',
        password: 'a',
        role: 'user'
      }


  ];
  
  
  
  
  
  module.exports = {
    vinos,
    users
  };
  