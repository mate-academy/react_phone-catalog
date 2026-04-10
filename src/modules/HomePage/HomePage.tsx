import styles from './HomePage.module.scss';
import { Container } from '../../shared/components/Container';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductsCarousel } from './components/ProductsCarousel';
import type { Product, CartItem } from '../../types';
import productsFromServer from '../../../public/api/products.json';

type Props = {
  cart: CartItem[];
  favorites: Product[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const HomePage: React.FC<Props> = ({
  cart,
  favorites,
  onAddToCart,
  onToggleFavorite,
}) => {
  const products = productsFromServer;

  return (
    <Container>
      <h1 className={styles.tytle}>Product Catalog</h1>

      <div className={styles.stack}>
        <PicturesSlider />

        <ProductsCarousel
          title="Brand new models"
          mode="new"
          cart={cart}
          favorites={favorites}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
        <ShopByCategory products={products as Product[]} />
        <ProductsCarousel
          title="Hot prices"
          mode="hot"
          cart={cart}
          favorites={favorites}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </Container>
  );
};
