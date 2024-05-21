import { State } from './State';
import { Product } from './Product';
import { CartItem } from './CartItem';

export interface InitialContext {
  state: State;
  methods: {
    setProducts: () => Promise<void>;
    setCart: (cart: CartItem[]) => void;
    setFavourites: (favourites: Product[]) => void;
    setError: (errorMessage: string) => void;
    setLoading: (isLoading: boolean) => void;
    addProductToCart: (newCartProduct: CartItem) => void;
    addProductToFavourites: (product: Product) => void;
    removeProductFromCart: (id: string) => void;
    removeProductFromFavourites: (id: number) => void;
    handleIncrement: (item: CartItem) => void;
    handleDecrement: (item: CartItem) => void;
    handleClearCart: () => void;
  };
}
