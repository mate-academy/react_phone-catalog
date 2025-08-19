export type BaseProduct = {
  id: string;
  name: string;
  namespaceId?: string;
  category?: string;
};

export type CategoryCount = {
  mobile: number;
  tablets: number;
  accessories: number;
};

export type ProductForCard = {
  id: number;
  category: string;
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
  quantity?: number;
};
