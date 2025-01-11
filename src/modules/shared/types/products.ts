enum Category {
  accessories = 'accessories',
  phones = 'phones',
  tablets = 'tablets',
}

export type Product = {
  id: number;
  category: Category;
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

export type Accessories = {
  id: string;
  category: Category.accessories;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
};

export type Phone = Omit<Accessories, 'category'> & {
  category: Category.phones;
  camera: string;
  zoom: string;
};

export type Tablets = Omit<Phone, 'category'> & {
  category: Category.tablets;
};

export type ProductsWithDetails = Product & {
  details: Phone | Tablets | Accessories | null;
};
