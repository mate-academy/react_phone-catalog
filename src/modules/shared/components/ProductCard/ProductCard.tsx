import classNames from 'classnames';
import { Button } from '../Button';
import { FavouriteButton } from '../FavouriteButton';
import styles from './ProductCard.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import { Product } from '../../types/types';
import { Category } from '../../types/enums';
import { accessoriesPath, phonesPath, tabletsPath } from '../../consts/paths';
import { Link } from 'react-router-dom';
import { DecorativeLine } from '../DecorativeLine';
import { separateValueFromUnit } from '../../functions';
import { useCart } from '../Contexts/CartContext';
import { useMemo } from 'react';

type Props = {
  product: Product;
  isClicked?: boolean;
  draggable?: boolean;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isClicked = true,
  draggable = true,
  className,
}) => {
  const { cart, handleProductAdd } = useCart();
  const {
    screen: screenLabel,
    capacity: capacityLabel,
    size: sizeLabel,
    ram: ramLabel,
    addToCart,
    addedToCart,
  } = useLanguage().localeTexts;
  const {
    itemId,
    category,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isClicked) {
      event.preventDefault();
    }
  };

  const handleAddToCartButtonClick = () => {
    if (isClicked) {
      handleProductAdd(product);
    }
  };

  let path: string;

  switch (category) {
    case Category.Phones:
      path = phonesPath;
      break;
    case Category.Tablets:
      path = tabletsPath;
      break;
    case Category.Accessories:
      path = accessoriesPath;
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  path += '/' + itemId;

  const isInCart = useMemo(
    () => cart.some(productInCart => productInCart.id === itemId),
    [cart, itemId],
  );

  return (
    <article className={classNames(styles.ProductCard, className)}>
      <Link
        to={path}
        aria-label={name}
        draggable={draggable}
        className={styles.ImageLink}
        onClick={handleLinkClick}
      >
        <img
          src={image}
          alt={name}
          draggable={draggable}
          className={styles.Image}
        />
      </Link>

      <Link
        to={path}
        draggable={draggable}
        className={styles.TitleLink}
        onClick={handleLinkClick}
      >
        {name}
      </Link>

      <div className={styles.Prices}>
        <strong className={styles.Price}>{`$${price}`}</strong>

        {price !== fullPrice && (
          <del
            data-content={`$${fullPrice}`}
            className={styles.Discount}
          >{`$${fullPrice}`}</del>
        )}
      </div>

      <DecorativeLine />

      <ul className={styles.Parameters}>
        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{screenLabel}</p>
          <p className={styles.ParameterValue}>{screen}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>
            {category === Category.Accessories ? sizeLabel : capacityLabel}
          </p>

          <p className={styles.ParameterValue}>
            {separateValueFromUnit(capacity)}
          </p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{ramLabel}</p>
          <p className={styles.ParameterValue}>{separateValueFromUnit(ram)}</p>
        </li>
      </ul>

      <div className={styles.Buttons}>
        <Button
          text={isInCart ? addedToCart : addToCart}
          onClick={handleAddToCartButtonClick}
          active={isInCart}
          className={styles.AddToCartButton}
        />
        <FavouriteButton className={styles.FavouriteButton} />
      </div>
    </article>
  );
};
