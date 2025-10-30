import { Link } from 'react-router-dom';
import { Product } from 'types/ProductInfo';
import Buttons from 'components/Buttons/Buttons';
import styles from './CardItem.module.scss';

interface CardItemProps {
  product: Product;
  option?: 'new' | 'hot';
}

const CardItem = ({ product, option = 'new' }: CardItemProps) => {
  const cleanScreen =
    product?.screen?.replace(/\s*['`]?\s*(?:\(.*?\)| Retina XDR).*/, '') ||
    product?.screen;

  const hasDiscount =
    option === 'hot' &&
    product.priceDiscount &&
    product.priceDiscount < product.priceRegular;

  return (
    <div className={styles.cardLink}>
      <div className={styles.card}>
        <Link
          to={`/${product.category}/${product.id}`}
          className={styles.card_imageContainer}
        >
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className={styles.card_img}
              loading="lazy"
            />
          ) : (
            <div className={styles.card_placeholder}>No image</div>
          )}
        </Link>

        <div className={styles.content}>
          <h3 className={styles.card_title}>{product.name}</h3>

          <div className={styles.card_price}>
            {hasDiscount ? (
              <>
                <p className={styles.card_priceDiscount}>
                  ${product.priceDiscount}
                </p>
                <p className={styles.card_priceRegular2}>
                  ${product.priceRegular}
                </p>
              </>
            ) : (
              <p className={styles.card_priceRegular}>
                ${product.priceRegular}
              </p>
            )}{' '}
          </div>

          <div className={styles.card_divider}></div>

          <div className={styles.card_details}>
            <div className={styles.card_info}>
              <span className={styles.card_specLabel}>Screen</span>
              <span className={styles.card_specValue}>{cleanScreen}</span>
            </div>
            <div className={styles.card_info}>
              <span className={styles.card_specLabel}>Capacity</span>
              <span className={styles.card_specValue}>{product.capacity}</span>
            </div>
            <div className={styles.card_info}>
              <span className={styles.card_specLabel}>RAM</span>
              <span className={styles.card_specValue}>{product.ram}</span>
            </div>
          </div>
          <Buttons product={product} />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
