import { Link, useLocation } from 'react-router-dom';

import { FavouriteButton } from '../../ui/FavouriteButton';
import { PurchaseButton } from '../../ui/PurchaseButton';

import { favoriteIcon } from '../../assets';
import isFavoriteIcon from '../../assets/images/is-favorite.svg';

import { Product } from '../../types/Product';
import { extractNumberAndSuffix } from '../../utils';
import { ProductCardPrices } from '../ProductCardPrices';

import { useProductsCart } from '../../store/CartProvider';
import { useFavorites } from '../../store/FavoritesProvider';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  isHotPrice: boolean;
};

export const ProductCard: React.FC<Props> = props => {
  const { pathname } = useLocation();
  const { addProduct, cart } = useProductsCart();
  const { favorites, addToFavorites, removeProduct } = useFavorites();

  const isHaveProduct = cart.some(item => item.id === props.product.id);
  const isFavoriteProduct = favorites.some(
    item => item.id === props.product.id,
  );

  const { name, screen, capacity, ram, image, price, fullPrice, itemId } =
    props.product;
  const { isHotPrice } = props;

  const normalizeCapacity = extractNumberAndSuffix(capacity);
  const normalizeRam = extractNumberAndSuffix(ram);

  const activeProductCardText = `${styles.DescriptionsText} ${styles.DescriptionsTextActive}`;

  const handleAddProduct = () => {
    addProduct(props.product);
  };

  const handleToggleFavoriteStatus = () => {
    if (!isFavoriteProduct) {
      addToFavorites(props.product);
    } else {
      removeProduct(props.product.id);
    }
  };

  return (
    <div className={styles.ProductCard}>
      <Link
        className={styles.Link}
        to={`/product/${itemId}`}
        state={{ prevPath: pathname }}
      >
        <img className={styles.Picture} src={image} alt="product" />
        <p className={styles.Title}>{name}</p>
      </Link>

      <ProductCardPrices
        fontSize="22px"
        isHotPrice={isHotPrice}
        price={price}
        fullPrice={fullPrice}
      />

      <div className={styles.ProductCardInner}>
        <div className={styles.Descriptions}>
          <p className={styles.DescriptionsText}>Screen</p>
          <p className={styles.DescriptionsText}>Capacity</p>
          <p className={styles.DescriptionsText}>RAM</p>
        </div>
        <div className={styles.Descriptions}>
          <p className={activeProductCardText}>{screen}</p>
          <p className={activeProductCardText}>{normalizeCapacity}</p>
          <p className={activeProductCardText}>{normalizeRam}</p>
        </div>
      </div>

      <div className={styles.Buttons}>
        <PurchaseButton handleClick={handleAddProduct}>
          {isHaveProduct ? 'Added to cart' : 'Add to cart'}
        </PurchaseButton>

        <FavouriteButton
          className={isFavoriteProduct ? 'Active' : ''}
          isLarge={false}
          handleClick={handleToggleFavoriteStatus}
        >
          <img
            src={isFavoriteProduct ? isFavoriteIcon : favoriteIcon}
            alt="favorite"
          />
        </FavouriteButton>
      </div>
    </div>
  );
};
