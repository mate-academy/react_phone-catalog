import './PhonesPage.scss';
import { useContext } from 'react';

import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { StateContext } from '../../store/State';
import { getPhones } from '../../helpers/productsHelpers';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/product';
import { SortParams } from '../../types/select';

function getPreparedProducts(
  products: Product[],
  { sortBy, query }: { sortBy: SortParams, query?: string },
) {
  const preparedProducts = [...products];

  preparedProducts.sort((product1, product2) => {
    const value1 = product1[sortBy];
    const value2 = product2[sortBy];

    if ((typeof value1 === 'string') && (typeof value2 === 'string')) {
      return value1.toLowerCase().localeCompare(value2.toLocaleLowerCase());
    }

    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 - value2;
    }

    return 0;
  });

  if (query) {
    preparedProducts
      .filter(el => el.name.toLowerCase().includes(query.toLowerCase()));
  }

  return preparedProducts;
}

export const PhonesPage = () => {
  const { allProducts } = useContext(StateContext);
  const [searchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') || 'age') as SortParams;
  const phones = getPhones(allProducts);
  const preparedPhones = getPreparedProducts(allProducts, { sortBy });
  const phonesQuantity = phones.length;

  return (
    <div className="phones-page">
      <header className="phones-page__header">
        <div className="phones-page__breadcrumb">
          <BreadCrumbs />
        </div>

        <h1 className="phones-page__title">Mobile phones</h1>

        <p className="phones-page__counter">{`${phonesQuantity} models`}</p>
      </header>

      <main>
        <ProductList products={preparedPhones} />
      </main>
    </div>
  );
};
