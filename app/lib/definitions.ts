export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type Vino = {
  id: number;
  winery: string;
  wine: string;
  average_rating: number;
  reviews: string;
  location: string;
  image: string;
  wine_category: string;
  price: number;
  cantidad?: number;
  available?: boolean;
};
