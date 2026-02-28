import { FC, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './CatalogProducts.module.scss';
import { TotalAmount } from '../../../CartPage/components/TotalAmount';

type Props = {
  visibleProducts: Product[];
  cart?: boolean;
};

export const CatalogProducts: FC<Props> = ({ visibleProducts, cart }) => {
  const [count, setCount] = useState<number>(1);

  return (
    <>
      <div className={styles.cart__wrapper}>
        <div className={cart ? styles.cart__products : styles.products}>
          <>
            {visibleProducts.map(product => {
              return (
                <ProductCard
                  key={product.itemId}
                  title={product.name}
                  fullPrice={product.fullPrice}
                  descScreen={product.screen}
                  descCapacity={product.capacity}
                  descRAM={product.ram}
                  img={product.image}
                  currentPrice={product.price}
                  type={'hot'}
                  productId={product.itemId}
                  cart={cart}
                  setCount={setCount}
                  count={count}
                />
              );
            })}
          </>
        </div>

        {cart && <TotalAmount products={visibleProducts} />}
      </div>
    </>
  );
};
