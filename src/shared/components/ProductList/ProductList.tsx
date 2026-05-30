import styles from './ProductList.module.scss';
import { ProductItem } from '../../../shared/components/ProductItem';
import { Phone } from '../../../types/Phone';
import { useSearchParams } from 'react-router-dom';
import allProducts from '../../../../public/api/products.json';
import { Pagination } from '../Pagination';

type Props = {
  products: Phone[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsAmount = searchParams.get('items');
  const sortBy = searchParams.get('sort');

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortBy) {
      return 0;
    }

    if (sortBy === 'newest') {
      const aProd = allProducts.find(prod => a.name === prod.name);
      const bProd = allProducts.find(prod => b.name === prod.name);

      const aYear = aProd?.year ?? 0;
      const bYear = bProd?.year ?? 0;

      return bYear - aYear;
    }

    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'cheapest') {
      return a.priceDiscount - b.priceDiscount;
    }

    return 0;
  });

  const startIndex = (Number(searchParams.get('page')) - 1) * Number(itemsAmount);
  const endIndex = startIndex + Number(itemsAmount);

  const preparedProducts = itemsAmount
    ? [...sortedProducts].slice(startIndex, endIndex)
    : sortedProducts;

  return (
    <>
      <div className={styles.productlist}>
        {preparedProducts.map(phone => {
          return (
            <ProductItem
              key={phone.id}
              product={phone}
              fullPrice={true}
              widthItem="catalog"
              find={false}
            />
          );
        })}
      </div>
      {itemsAmount && (
        <Pagination
          searchParams={searchParams}
          onSearchParams={value => setSearchParams(value)}
          itemsAmount={+itemsAmount}
          productsLength={products.length}
        />
      )}
    </>
  );
};
