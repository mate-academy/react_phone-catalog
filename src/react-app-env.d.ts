// / <reference types="react-scripts" />

interface InitialProduct {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
  quantityInCart: number,
}

type Product = Omit<InitialProduct, 'quantityInCart'>;

type ProductContextType = {
  products: Product[],
  setProducts: (products: Product[]) => void,
  loading: boolean,
  setLoading: (boolean) => void,
  phones: Product[],
  setPhones: (products: Product[]) => void,
  tablets: Product[],
  setTablets: (products: Product[]) => void,
  accessories: Product[],
  setAccessories: (products: Product[]) => void,
  hotPriceProducts: Product[],
  setHotPriceProducts: (products: Product[]) => void,
  brandNewProducts: Product[],
  setBrandNewProducts: (products: Product[]) => void,
  suggestedProducts: Product[],
  setSuggestedProducts: (products: Product[]) => void,
};

type CartContextType = {
  cart: InitialProduct[],
  setCart: (products: InitialProduct[]) => void,
  addToCart: (product: Product) => void,
  removeFromCart: (cartItemId: string) => void,
  increase: (cartItemId: string) => void,
  decrease: (cartItemId: string) => void,
  totalAmount: number,
  totalQuantity: number,
};

type FavouriteContextType = {
  favourites: Product[],
  setFavourites: (products: Product[]) => void,
  isFavouriteToggle: (product: Product) => void,
};

type Battery = {
  type: string,
};

type Camera = {
  primary: string,
};

type Connectivity = {
  bluetooth: string,
};

type Display = {
  screenResolution: string,
  screenSize: string,
};

type Hardware = {
  cpu: string,
};

type Storage = {
  ram: string,
};

interface ProductDetails {
  battery: Battery,
  camera: Camera,
  connectivity: Connectivity,
  description: string,
  display: Display,
  hardware: Hardware,
  id: string,
  images: string[];
  name: string,
  storage: Storage,
}
