import { Product, ProductOtherData } from './Product';

export interface CartProduct {
  id: string;
  quantity: number;
  product: Product;
}

export interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: (products: CartProduct[]) => void;
}

export interface FavouriteContextType {
  favouriteProducts: Product[];
  setFavouriteProducts: (products: Product[]) => void;
}

export interface ProductListContextType {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export interface AggregatedProductListContextType {
  aggregatedProductList: ProductOtherData[];
  setAggregatedProductList: (products: ProductOtherData[]) => void;
}

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}
