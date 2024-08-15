import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CommonPropsProduct } from '../../types/CommonPropsProduct';
import { AddButtons } from '../AddButtons';
import styles from './ProductCard.module.scss';

interface Props {
  product: CommonPropsProduct;
  sliderCard?: boolean;
  showFullPriceOnly?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  sliderCard = false,
  showFullPriceOnly = false,
}) => {
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
  const noDiscount = fullPrice === price;

  const productDetailsPath = useMemo(
    () => `/${category.toLowerCase()}/${itemId.toLowerCase()}`,
    [category, itemId],
  );

  return (
    <div
      className={classNames(styles.productCard, {
        [styles.sliderCard]: sliderCard,
      })}
    >
      <Link to={productDetailsPath} className={styles.imgLink}>
        <img className={styles.img} src={image} alt={itemId} />
      </Link>

      <Link to={productDetailsPath} className={styles.name}>
        {name}
      </Link>

      <div className={styles.priceWrapper}>
        <p
          className={styles.price}
          hidden={showFullPriceOnly || noDiscount}
        >{`$${price}`}</p>
        <p
          className={classNames(styles.fullPrice, {
            [styles.fullPriceOnly]: showFullPriceOnly || noDiscount,
          })}
        >{`$${fullPrice}`}</p>
      </div>

      <div className={styles.hr} />

      <table>
        <tbody className={styles.tbody}>
          <tr className={styles.row}>
            <td className={styles.cell1}>Screen</td>
            <td className={styles.cell2}>{screen}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell1}>Capacity</td>
            <td className={styles.cell2}>{capacity}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell1}>RAM</td>
            <td className={styles.cell2}>{ram}</td>
          </tr>
        </tbody>
      </table>

      <AddButtons product={product} />
    </div>
  );
};
