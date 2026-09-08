import { Product } from '@/types/Product';
import { FC, memo } from 'react';
import { IoMdClose } from 'react-icons/io';
import styles from './CartItem.module.scss';
import { Counter } from '@/modules/shared/components/Counter';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  count: number;
}

export const CartItem: FC<Props> = memo(function CartItem({ product, count }) {
  const { id, name, image, fullPrice, price, itemId } = product;
  const { changeProductCount: changeCount, removeFromCart } = useCart();

  const isPrevDisabled = count === 1;
  const productLink = `/product/${itemId}`;

  const handleChangeProductCount = (newCount: number) => {
    changeCount(product, newCount);
  };

  return (
    <article className={styles.card}>
      <div className={styles.mainContent}>
        <button className={styles.removeBtn} onClick={() => removeFromCart(id)}>
          <IoMdClose size={16} />
        </button>
        <Link className={styles.preview} to={productLink}>
          <img src={image} alt={name} />
        </Link>
        <Link to={productLink}>
          <h3 className={styles.title}>{name}</h3>
        </Link>
      </div>
      <div className={styles.actions}>
        <Counter
          value={count}
          onChange={handleChangeProductCount}
          isPrevDisabled={isPrevDisabled}
        />

        <span className={styles.price}>${price ?? fullPrice}</span>
      </div>
    </article>
  );
});
