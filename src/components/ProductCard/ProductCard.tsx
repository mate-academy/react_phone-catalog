import { Link } from 'react-router-dom';
import { useProducts } from '../../Store';

import styles from './ProductCard.module.scss';
import Favourites from '../../img/icons/Favourites.svg';
import FavouritesRed from '../../img/icons/FavouritesRed.svg';

import { numberToCurrency } from '../../utils/numberToCurrency';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Product } from '../../types/Product';
import { useToggle } from '../../hooks/useToggle';
import { SpecificationsProduct } from '../SpecificationsProduct';

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    cartProducts,
    setCartProducts,
    favouritesProducts,
    setFavouritesProducts,
  } = useProducts();

  const [isSelected, toggleCart] = useToggle(
    'Cart',
    cartProducts,
    setCartProducts,
    product,
  );
  const [isFavourit, toggleFavourit] = useToggle(
    'Favourit',
    favouritesProducts,
    setFavouritesProducts,
    product,
  );

  return (
    <div
      className={styles.productCard}
      data-cy="cardsContainer"
    >
      <Link to={`../../catalog/${product.category}/${product.itemId}`}>
        <img
          className={styles.productImg}
          src={`./_new/${product.image}`}
          alt="product"
        />
      </Link>
      <h3 className={`bodyText ${styles.productTitle}`}>{product.name}</h3>
      <h2>
        {numberToCurrency(product.price)}
        <s className={styles.fullPrice}>
          {numberToCurrency(product.fullPrice)}
        </s>
      </h2>
      <hr />
      <SpecificationsProduct product={product} />
      <div className={styles.btns}>
        <Button
          text={isSelected ? 'Added to cart' : 'Add to cart'}
          onClick={toggleCart}
          isSelected={!!isSelected}
        />
        <Icon
          icon={isFavourit ? FavouritesRed : Favourites}
          alt="Favourites"
          stylesName={styles.btnsIcon}
          onClick={toggleFavourit}
          data-cy="addToFavorite"
        />
      </div>
    </div>
  );
};
