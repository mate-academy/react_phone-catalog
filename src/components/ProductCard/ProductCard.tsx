import classNames from 'classnames';
import { SliderProduct } from '../../types/SliderProduct';
import styles from './ProductCard.module.scss';

interface Props {
  product: SliderProduct;
  discountHidden?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  discountHidden = false,
}) => {
  const { itemId, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  return (
    <div className={styles.productCard}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={image} alt={itemId} />
      </div>

      <p className={styles.name}>{name}</p>

      <div className={styles.priceWrapper}>
        <p className={styles.fullPrice}>{`$${fullPrice}`}</p>
        <p
          className={styles.discountPrice}
          hidden={discountHidden}
        >{`$${price}`}</p>
      </div>

      <div className={styles.hr}></div>

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

      <div className={styles.buttons}>
        <button type="button" className={classNames(styles.btnAdd)} />
        <button type="button" className={classNames(styles.btnLike)} />
      </div>
    </div>
  );
};
