import products from '../api/products.json';

type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  capacity: string;
  image: string;
  price: number;
  ram: string;
  screen: string;
  year: number;
  color: string;
};

type Item = {
  id: string;
  camera?: string;
  capacity: string;
  capacityAvailable: string[];
  category: string;
  cell: string[];
  color: string;
  colorsAvailable: string[];
  description: { title: string; text: string[] }[];
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom?: string;
};

const addToCart = (id: string) => {
  const data = localStorage.getItem('card');
  const newData = data ? JSON.parse(data) : [];

  newData.push(id);
  localStorage.setItem('card', JSON.stringify(newData.sort()));
};

const addToLiked = (id: string) => {
  const data = localStorage.getItem('liked');
  const newData = data ? JSON.parse(data) : [];

  newData.push(id);
  localStorage.setItem('liked', JSON.stringify(newData));
};

const removedFromLiked = (id: string) => {
  const data = localStorage.getItem('liked');
  const newData = data ? JSON.parse(data) : [];

  const removeData = newData.filter((data: string) => data !== id);

  localStorage.setItem('liked', JSON.stringify(removeData));
};

const removedFromCard = (id: string) => {
  const data = localStorage.getItem('card');
  const newData = data ? JSON.parse(data) : [];

  const removeData = newData.filter((data: string) => data !== id);

  localStorage.setItem('card', JSON.stringify(removeData));
};

const getFromStorage = (key: string) => {
  const data = localStorage.getItem(key);
  const newData = data ? JSON.parse(data) : [];

  return newData;
};

const findById = (ids: string[]) => {
  const items: Product[] = [];

  ids?.map((id: string) => {
    const item = products.find(product => product.itemId === id);

    if (item) {
      items.push(item);
    }
  });

  return items;
};

const findProduct = (category: string | undefined) => {
  return products.filter((product: Product) => product.category === category);
};

const findSale = (category: string) => {
  const currentProduct = findProduct(category);

  const saleProducts = currentProduct
    .filter(
      (product: Product) =>
        ((product.fullPrice - product.price) / product.fullPrice) * 100 > 10,
    )
    .reduce<Product[]>((acc, item) => {
      if (!acc.find(prod => prod.color === item.color)) {
        acc.push(item);
      }

      return acc;
    }, []);

  return saleProducts;
};

const findSimilar = (category: string, activeItem: Item) => {
  const currentProduct = findProduct(category);
  const similarProducts = currentProduct.filter(
    (product: Product) => product.color === activeItem.color,
  );

  return similarProducts;
};

const previous = (prevIndex: number, itemArray: Product[]) => {
  const newIndex = (prevIndex - 1 + itemArray.length) % itemArray.length;

  return newIndex;
};

const next = (prevIndex: number, itemArray: Product[]) => {
  const newIndex = (prevIndex + 1) % itemArray.length;

  return newIndex;
};

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const handleButton = {
  previous,
  next,
  scrollTop,
};

export const utils = {
  findProduct,
  findSale,
  findSimilar,
  addToCart,
  addToLiked,
  findById,
  getFromStorage,
  removedFromLiked,
  removedFromCard,
};
