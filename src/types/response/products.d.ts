export interface Product {
  _id: string;
  name: string;
  description: string;
  starterPrice: number;
  currentPrice?: {
    amount: number;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    createdAt: string;
  } | null;
  buyoutPrice: number;
  sold: boolean;

  category?: Category | null;
  profile?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
}
