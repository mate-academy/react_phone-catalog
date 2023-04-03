import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemsOnPage, Sort } from '../../enums/enums';
import { getSalePrice } from '../../helpers/helpers';
import { Product } from '../../types/Product';
import { BreadCrumbs } from '../BreadCrumbs';
import { CustomSelect } from '../CustomSelect';
import { Pagination } from '../Pagination';
import { ProductList } from '../ProductList';
import { NoResults } from '../NoResults/NoResults';

const options = {
  sort: ['Newest', 'Alphabetically', 'Cheapest'],
  perPage: ['4', '8', '16', 'All'],
};

type Props = {
  title: string;
  products: Product[];
};

export const ProductBrowse: React.FC<Props> = ({ title, products }) => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const sortParam = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  const getProductsOnPage = useCallback(() => {
    const itemsOnPage = searchParams.get('perPage');

    switch (itemsOnPage) {
      case ItemsOnPage.ALL:
        return products.length;

      case ItemsOnPage.FOUR:
        return 4;

      case ItemsOnPage.EIGHT:
        return 8;

      case ItemsOnPage.SIXTEEN:
        return 16;

      default:
        return 16;
    }
  }, [searchParams]);

  const perPage = getProductsOnPage();

  const onPageSelect = () => {
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getSortedProducts = useCallback((sortOption: string) => {
    const copy = [...products];

    switch (sortOption) {
      case Sort.NEWEST:
        return copy.sort((a, b) => a.age - b.age);

      case Sort.ALPHABET:
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case Sort.CHEAPEST:
        return copy.sort(
          (a, b) => {
            const priceA = getSalePrice(a.price, a.discount);
            const priceB = getSalePrice(b.price, b.discount);

            return priceA - priceB;
          },
        );

      default:
        return copy;
    }
  }, [products]);

  const lastItemIndex = currentPage * perPage;
  const firstItemIndex = lastItemIndex - perPage;

  const currItems = getSortedProducts(sortParam)
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    .slice(firstItemIndex, lastItemIndex);

  const isNoPagination = perPage < currItems.length
    || currItems.length === products.length;

  return (
    <section className="page__products">
      <BreadCrumbs />
      <h1 className="page__title">
        {title}
      </h1>

      <span className="page__models-count">
        {query ? `${currItems.length} results` : `${products.length} models`}
      </span>

      <div className="page__selectWrapper">
        <CustomSelect
          type="select__sort"
          options={options.sort}
          onSelect={onPageSelect}
          width={176}
          search="sort"
          defaultValue="Newest"
        />

        <CustomSelect
          type="select__pagination"
          options={options.perPage}
          onSelect={onPageSelect}
          width={128}
          defaultValue={16}
          search="perPage"
        />
      </div>

      {currItems.length > 0 ? (
        <>
          <ProductList products={currItems} />

          {!isNoPagination && (
            <Pagination
              total={query ? currItems.length : products.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          )}
        </>
      ) : (
        <NoResults name="Product" />
      )}
    </section>
  );
};
