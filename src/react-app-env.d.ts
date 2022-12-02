// / <reference types="react-scripts" />
type Product = {
  age: number,
  id: string,
  type: 'tablet' | 'phone' | 'accessory',
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
  description: string,
  display: {
    screenResolution: string,
  },
  hardware: {
    cpu: string,
  },
  connectivity: {
    cell: string,
  },
  camera: {
    primary: string,
  }
  images: string[],
  quantity?: number,
};

type ProductSliderFilters = 'discount' | 'no-discount' | 'random';
type ProductSliderSorting = 'discount-value' | 'age';
type FetchProductsType = () => Promise<Product[]>;
type FetchProductType = (productId: string) => Promise<Product>;
type FetchGeneralDetailsType = (
  productId: string,
) => Promise<Product | undefined>;
type DropDownOptionType = {
  name: string,
  value: string,
};
interface CartItem extends Product {
  quantity: number,
}
type SavedProduct = Product | CartItem;
