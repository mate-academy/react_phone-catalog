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

// type Item = {
//   camera: string,
//   capacity: string,
//   capacityAvailable: string[],
//   category: string,
//   cell: string[]
//   color: string,
//   colorsAvailable: string[],
//   description: { title: string, text: string[] }[],
//   id: string,
//   images: string[],
//   name: string,
//   namespaceId: string,
//   priceDiscount: number,
//   priceRegular: number,
//   processor: string,
//   ram: string,
//   resolution: string,
//   screen: string,
//   zoom: string,
// }

const findProduct = (category: string) => {
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
};
