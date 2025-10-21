import { Item } from '@features/globalStore/types';
import { CatalogueProduct, Product } from '@shared/types';

type ProductProps = {
  product: CatalogueProduct | Product;
  isIn: {
    fav: (itemId: string) => boolean;
    cart: (itemId: string) => boolean;
  };
  stateHandlers: {
    toggleCart: (e: React.MouseEvent, item: Item) => void;
    toggleFav: (e: React.MouseEvent, item: Item) => void;
  };
};

interface Conf {
  link: {
    to: string;
    onClick: (e: React.MouseEvent) => void;
  };
  name: string;
  listData: Record<string, string | null>;
  priceMain: string;
  priceSecondary: string | null;
  image?: {
    src: string;
    alt: string;
  };
  buttonProps: {
    isInFav: boolean;
    isInCart: boolean;
    handleCart: (e: React.MouseEvent) => void;
    handleFav: (e: React.MouseEvent) => void;
  };
}

export { type Conf, type ProductProps };
