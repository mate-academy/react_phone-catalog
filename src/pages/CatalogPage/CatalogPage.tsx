import { CatalogHeader } from '../../components/catalogHeader';
import styles from './CatalogPage.module.scss';
import { ProductList } from '../../components/productList';
import { useFetchProducts } from '../../helpers/useFetchProducts';
import { useSearchParams } from 'react-router-dom';
import { ProductCardSkeleton } from '../../components/productCardSkeleton';

type ProductType = 'products' | 'phones' | 'tablets' | 'accessories';

type Props = {
  type: ProductType;
};

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const { loading, phones, tablets, accessories } = useFetchProducts(type);
  const [searchParams] = useSearchParams();
  const onPage = searchParams.get('onPage') || '16';

  const title =
    type === 'phones'
      ? 'Mobile phones'
      : type === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  const items =
    type === 'phones' ? phones : type === 'tablets' ? tablets : accessories;

  const perPage = onPage === 'all' ? items.length : +onPage;

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
