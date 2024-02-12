type CategoryName = 'phone' | 'tablet' | 'accessory';

export type Product = {
  age: number,
  type: CategoryName,
  id: string,
  imageUrl: string
  name: string
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string
};

export type Category = {
  id: number;
  title: string;
  img: string;
  category: CategoryName;
};
