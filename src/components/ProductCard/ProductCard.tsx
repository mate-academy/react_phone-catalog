import classNames from 'classnames';
import { Button } from '../Button';
import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';

import { FavouritesButton } from '../FavouritesButton/FavouritesButton';
import { Link, useSearchParams } from 'react-router-dom';
import { PriceBlock } from '../PriceBlock';
import { useShoppingCart } from '../../store/CartContext';

type Props = {
  product: Product;
  productSlider?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, productSlider }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const { addToCart, shoppingCartProducts, deleteFromCart } = useShoppingCart();
  const [searchParams] = useSearchParams();

  const addedToCart = shoppingCartProducts.find(item => item.id === product.id);

  const handleCartProducts = () => {
    return addedToCart ? deleteFromCart(product.itemId) : addToCart(product);
  };

  const techValueClassName = classNames(
    'text-small',
    styles.productCard__techValue,
  );

  const link = `/${category}/${itemId}`;

  const className = classNames(styles.productCard, {
    [styles.productCard__slider]: productSlider,
  });

  return (
    <div className={className}>
      <Link
        to={link}
        state={{ search: searchParams.toString() }}
        className={styles.productCard__imgWrapper}
      >
        <img className={styles.productCard__img} src={image} alt="product" />
      </Link>
      <div>
        <Link to={link} state={{ search: searchParams.toString() }}>
          <p className={classNames(styles.productCard__text, 'text-body')}>
            {name}
          </p>
        </Link>

        <PriceBlock price={fullPrice} priceDiscount={price} />

        <div className={styles.productCard__divider}></div>

        <div className={styles.productCard__information}>
          <div className={styles.productCard__info}>
            <p className="text-small">Screen</p>
            <p className={techValueClassName}>{screen}</p>
          </div>
          <div className={styles.productCard__info}>
            <p className="text-small">Capacity</p>
            <p className={techValueClassName}>{capacity}</p>
          </div>
          <div className={styles.productCard__info}>
            <p className="text-small">RAM</p>
            <p className={techValueClassName}>{ram}</p>
          </div>
        </div>
        <div className={styles.productCard__btns}>
          <div onClick={handleCartProducts} className={styles.productCard__btn}>
            <Button text={'Add to cart'} addedToCart={addedToCart} />
          </div>

          <FavouritesButton product={product} />
        </div>
      </div>
    </div>
  );
};
