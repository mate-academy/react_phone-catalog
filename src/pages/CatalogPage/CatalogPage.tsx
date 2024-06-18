import { CatalogHeader } from '../../components/catalogHeader';
import styles from './CatalogPage.module.scss';
import { ProductList } from '../../components/productList';
import { Loader } from '../../components/Loader';
import { useFetchProducts } from '../../helpers/useFetchProducts';

type ProductType = 'products' | 'phones' | 'tablets' | 'accessories';

type Props = {
  type: ProductType;
};

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const { loading, phones, tablets, accessories } = useFetchProducts(type);

  const title =
    type === 'phones'
      ? 'Mobile phones'
      : type === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  const items =
    type === 'phones' ? phones : type === 'tablets' ? tablets : accessories;

  return (
    <section className={styles.phonespage}>
      <div className={styles.phonespage__top}>
        <CatalogHeader products={items} category={title} withoutDrop={false} />
      </div>

      {loading[type] && <Loader />}

      <div className={styles.phonespage__products}>
        <ProductList products={items} pagination={true} />
      </div>
    </section>
  );
};
