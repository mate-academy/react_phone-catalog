import { Link } from 'react-router-dom';
import { Product } from '../../types/ProductTypes';
import styles from './ProductCardStyles.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <>
      <section>
        <div className="product-grid">
          <div className={styles.iphone14_card} key={product.itemId}>
            <div className={styles.center_for_card}>
              <Link to={`/${product.category}/:${product.itemId}`}>
                <img src={product.image} alt={product.name} className={styles.products_photo} />
              </Link>
              <Link className={styles.name_styles} to={`/${product.category}/:${product.itemId}`}>
                <p className={styles.name_font_styles}>{product.name}</p>
              </Link>
            </div>
            <h3 className={styles.new_price}>
              ${product.price} <span className={styles.old_price}>${product.fullPrice}</span>
            </h3>
            <div className={styles.grey_line}></div>
            <p className={styles.characters}>
              Screen <span className={styles.span_caracters}>{product.screen}</span>
            </p>
            <p className={styles.characters}>
              Capacity <span className={styles.span_caracters}>{product.capacity}</span>
            </p>
            <p className={styles.characters}>
              RAM <span className={styles.span_caracters}>{product.ram}</span>
            </p>
            <div className={styles.styles_for_butt}>
              <button className={styles.add_to_cart}>Add to cart</button>
              <button className={styles.love_butt}>
                <img
                  src="\public\img\icons\love-it.svg"
                  alt="to favorite"
                  className={styles.favorite_product}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
