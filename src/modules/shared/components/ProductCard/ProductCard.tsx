import classNames from 'classnames';
import { Button } from '../Button';
import { FavouriteButton } from '../FavouriteButton';
import styles from './ProductCard.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import { Product } from '../../types/types';
import { Category } from '../../types/enums';

type Props = {
  product: Product;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({ product, className }) => {
  const {
    screen: screenLabel,
    capacity: capacityLabel,
    size: sizeLabel,
    ram: ramLabel,
    addToCart,
  } = useLanguage().localeTexts;
  const { category, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  return (
    <article className={classNames(styles.ProductCard, className)}>
      <a href="placeholder" className={styles.Card}>
        <img src={image} alt={name} className={styles.Image} />
        <h4 className={styles.Title}>{name}</h4>

        <div>
          <strong className={styles.Price}>{`$${price}`}</strong>

          {price !== fullPrice && (
            <del
              data-content={`$${fullPrice}`}
              className={styles.Discount}
            >{`$${fullPrice}`}</del>
          )}
        </div>

        <div className={styles.Line}></div>

        <ul className={styles.Parameters}>
          <li className={styles.Parameter}>
            <p className={styles.ParameterName}>{screenLabel}</p>
            <p className={styles.ParameterValue}>{screen}</p>
          </li>

          <li className={styles.Parameter}>
            <p className={styles.ParameterName}>
              {category === Category.Accessories ? sizeLabel : capacityLabel}
            </p>

            <p className={styles.ParameterValue}>{capacity}</p>
          </li>

          <li className={styles.Parameter}>
            <p className={styles.ParameterName}>{ramLabel}</p>
            <p className={styles.ParameterValue}>{ram}</p>
          </li>
        </ul>
      </a>

      <div className={styles.Buttons}>
        <Button text={addToCart} className={styles.AddToCartButton} />
        <FavouriteButton className={styles.FavouriteButton} />
      </div>
    </article>
  );
};
