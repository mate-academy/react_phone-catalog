import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '../../shared/components/Icons/HeartIcon';
import { PrimaryButton } from '../../shared/components/PrimaryButton';
import { Product } from '../../shared/types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={product.image} alt="" className={styles.card__img} />
      <p className={styles.card__title}>{product.name}</p>
      <div className={styles.card__price}>
        <h3>{`$${product.price}`}</h3>
        <h3 className={styles.card__crossed}>{`$${product.fullPrice}`}</h3>
      </div>
      <hr className={styles.card__line} />
      <ul className={styles.card__info}>
        <li>
          <p>Screen</p>
          <p>
            <span>{product.screen}</span>
          </p>
        </li>
        <li>
          <p>Capacity</p>
          <p>
            <span>{product.capacity.replace('GB', ' GB')}</span>
          </p>
        </li>
        <li>
          <p>RAM</p>
          <p>
            <span>{product.ram.replace('GB', ' GB')}</span>
          </p>
        </li>
      </ul>
      <div className={styles.card__buttons}>
        <PrimaryButton mainText="Add to cart" selectedText="Added to cart" />
        <HeartIcon />
      </div>
    </div>
  );
};
