import { FC, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './CatalogProducts.module.scss';
import { TotalAmount } from '../../../CartPage/components/TotalAmount';
// eslint-disable-next-line max-len
import { ProductCardForCart } from '../../../CartPage/components/ProductCardForCart';

type Props = {
  visibleProducts: Product[];
  cart?: boolean;
  pathName: string;
};

export const CatalogProducts: FC<Props> = ({
  visibleProducts,
  cart,
  pathName,
}) => {
  return (
    <>
      <div className={styles.cart__wrapper}>
        <div className={cart ? styles.cart__products : styles.products}>
          <>
            {visibleProducts.map(product => {
              return cart ? (
                <ProductCardForCart
                  key={product.itemId}
                  title={product.name}
                  img={product.image}
                  currentPrice={product.price}
                  productId={product.itemId}
                />
              ) : (
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
                  pathName={pathName}
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
