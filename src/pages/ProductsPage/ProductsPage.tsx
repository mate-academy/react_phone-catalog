import { FunctionComponent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Styles
import './ProductsPage.scss';

// Types
import { Product } from '../../types/Product';

// Components
import { NoResults } from '../../components/NoResults';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Select } from '../../components/Select/Select';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsPage: FunctionComponent<Props> = ({ title, products }) => {
  const sortItems = ['Newest', 'Alphabetically', 'Cheapest'];
  const perPageItems = ['4', '8', '16', 'All'];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'Newest';
  const perPage = searchParams.get('perPage') || 'All';
  const page = searchParams.get('page') || 1;
  const query = searchParams.get('query') || '';
  const pagesCount = Math.ceil(products.length / +perPage);
  const step = perPage === 'All' ? products.length : +perPage;
  const lastProductIndex = +page * step;
  const firstProductIndex = lastProductIndex - +perPage;
  const isFavourites = title === 'Favourites';
  const visibleProducts = query
    ? products.filter((product: Product) => product.name.toLowerCase().includes(query))
    : [...products];

  const handleChangeItem = (item: string) => {
    switch (item) {
      case 'Newest':
        searchParams.set('sort', item);
        visibleProducts.sort((firstProduct, secondProduct) => {
          return firstProduct.age - secondProduct.age;
        });
        break;

      case 'Alphabetically':
        searchParams.set('sort', item);
        visibleProducts.sort((firstProduct, secondProduct) => {
          return firstProduct.name.localeCompare(secondProduct.name);
        });
        break;

      case 'Cheapest':
        searchParams.set('sort', item);
        visibleProducts.sort((firstProduct, secondProduct) => {
          return firstProduct.newPrice - secondProduct.newPrice;
        });
        break;

      case 'All':
        searchParams.delete('perPage');
        searchParams.delete('page');
        break;

      default:
        searchParams.set('perPage', item);
        searchParams.set('page', '1');
    }

    navigate({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return query ? (
    <>
      {visibleProducts.length === 0
        ? (
          <NoResults type="search" />
        ) : (
          <>
            <p className="ProductsPage__amount">
              {`${visibleProducts.length} ${visibleProducts.length > 1 ? 'results' : 'result'}`}
            </p>

            <ProductsList products={visibleProducts} />
          </>
        )}
    </>
  ) : (
    <>
      {visibleProducts[0]
        ? (
          <>
            <Breadcrumbs />

            <h1 className="ProductsPage__title">{title}</h1>

            <p className="ProductsPage__amount">{`${visibleProducts.length} models`}</p>

            {!isFavourites && (
              <div className="ProductsPage__controls">
                <Select
                  title="Sort by"
                  selectedItem={sortBy}
                  items={sortItems}
                  onChangeItem={handleChangeItem}
                />

                <Select
                  title="Items on page"
                  selectedItem={perPage}
                  items={perPageItems}
                  onChangeItem={handleChangeItem}
                />
              </div>
            )}

            <ProductsList
              products={visibleProducts.slice(firstProductIndex, lastProductIndex)}
            />

            {pagesCount > 1 && (
              <Pagination pagesCount={pagesCount} />
            )}
          </>
        ) : (
          <NoResults type="" />
        )}
    </>
  );
};
