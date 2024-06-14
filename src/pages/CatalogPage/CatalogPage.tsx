import { useContext, useEffect } from 'react';
import { CatalogHeader } from '../../components/catalogHeader';
import styles from './CatalogPage.module.scss';
import { ProductList } from '../../components/productList';
import { AppContext } from '../../store/context';
import { Loader } from '../../components/Loader';

type ProductType = 'products' | 'phones' | 'tablets' | 'accessories';

type Props = {
  type: ProductType;
};

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const { loading, phones, tablets, products, accessories, fetchProducts } =
    useContext(AppContext);

  const title =
    type === 'phones'
      ? 'Mobile phones'
      : type === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  const items =
    type === 'phones' ? phones : type === 'tablets' ? tablets : accessories;

  useEffect(() => {
    if (
      (type === 'phones' && phones.length === 0) ||
      (type === 'tablets' && tablets.length === 0) ||
      (type === 'products' && products.length === 0) ||
      (type === 'accessories' && accessories.length === 0)
    ) {
      fetchProducts(type);
    }
  }, [
    type,
    fetchProducts,
    phones.length,
    tablets.length,
    products.length,
    accessories.length,
  ]);

  return (
    <section className={styles.phonespage}>
      <div className={styles.phonespage__top}>
        <CatalogHeader products={items} category={title} />
      </div>

      {loading[type] && <Loader />}

      <div className={styles.phonespage__products}>
        <ProductList products={items} />
      </div>
    </section>
  );
};
