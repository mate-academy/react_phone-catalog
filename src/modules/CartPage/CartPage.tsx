import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { CatalogProducts } from '../shared/components/CatalogProducts';
import { PageContainer } from '../shared/components/PageContainer';
import { Path } from '../shared/components/Path';
import { Title } from '../shared/components/Title';
import styles from './CartPage.module.scss';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const CartPage: FC<Props> = ({ products }) => {
  const addedProducts = useAppSelector(state => state.cart);

  const visibleProducts = products.filter(product =>
    addedProducts.some(item => item.id === product.itemId),
  );

  return (
    <PageContainer>
      <Path pathName="cart" nameOfProduct={'cart'} cart={true} />
      <Title title="Cart" amountPage={0} />
      {visibleProducts.length > 0 ? (
        <CatalogProducts cart={true} visibleProducts={visibleProducts} />
      ) : (
        <h2 className="message">Your cart is empty</h2>
      )}
    </PageContainer>
  );
};
