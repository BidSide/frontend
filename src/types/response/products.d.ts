export interface Product {
  _id: string;
  name: string;
  description: string;
  starterPrice: number;
  currentPrice: number;
  buyoutPrice: number;

  category?: Category | null;
  profile?: string;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
}
