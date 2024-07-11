import React, { useEffect } from 'react';
import { CatalogHeader } from '../../components/catalogHeader';
import styles from './CatalogPage.module.scss';
import { ProductList } from '../../components/productList';
import { ProductCardSkeleton } from '../../components/productCardSkeleton';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductCategory } from '../../types/ProductCategory';
import { fetchProducts } from '../../features/products';

type ProductType = 'products' | 'phones' | 'tablets' | 'accessories';

type Props = {
  type: ProductType;
};

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { phones, loading, tablets, accessories } = useAppSelector(
    state => state.products,
  );

  const onPage = searchParams.get('onPage') || '16';

  const title =
    type === 'phones'
      ? 'Mobile phones'
      : type === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  useEffect(() => {
    switch (type) {
      case 'phones':
        dispatch(fetchProducts(ProductCategory.PHONES) as any);
        break;
      case 'tablets':
        dispatch(fetchProducts(ProductCategory.TABLETS) as any);
        break;
      case 'accessories':
        dispatch(fetchProducts(ProductCategory.ACCESSORIES) as any);
        break;
      default:
        break;
    }
  }, [dispatch, type]);

  const items =
    type === 'phones' ? phones : type === 'tablets' ? tablets : accessories;

  const perPage = onPage === 'all' ? phones.length : +onPage;

  return (
    <section className={styles.phonespage}>
      <div className={styles.phonespage__top}>
        <CatalogHeader products={items} category={title} withoutDrop={false} />
      </div>

      <div className={styles.phonespage__products}>
        {loading ? (
          <ProductCardSkeleton cards={perPage} />
        ) : (
          <ProductList products={items} pagination={true} loading={loading} />
        )}
      </div>
    </section>
  );
};
