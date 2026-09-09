export type ProductCategory = 'phones' | 'tablets' | 'accessories';

// Форма одной записи из public/api/products.json — поля 1-в-1 как в файле
export type Product = {
  id: number;
  category: ProductCategory;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};
