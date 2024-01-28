import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';
import { SORT, optionsSorBy } from '../../utils/Sort';
import { Dropdown } from '../../components/Dropdown';

import './TabletsPage.scss';
import { PageSlider } from '../../components/PageSlider';
import { getSearchWith } from '../../helpers/searchHelper';

export const TabletsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];
  const perPage = searchParams.get('perPage') || '4';

  const tablets = products.filter(
    (product: Product) => product.type === 'tablet',
  );

  const optionsPerPage = [
    { label: 'all', value: `${tablets.length}` },
    { label: '4', value: '4' },
    { label: '8', value: '8' },
    { label: '16', value: '16' },
  ];

  const page = +(searchParams.get('page') || 1);

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || 'age';

  const getVisibleTablets = useCallback(() => {
    let currentTablets = [...tablets];

    currentTablets = currentTablets.sort((tablet1, tablet2) => {
      switch (sortBy) {
        case SORT.ALPHABETICALLY:
          return tablet1.name.localeCompare(tablet2.name);

        case SORT.NEWEST:
          return tablet1.age - tablet2.age;

        case SORT.OLDEST:
          return tablet2.age - tablet1.age;

        case SORT.PRICE_LOW_TO_HIGH:
          return (tablet1.price - tablet1.discount)
                - (tablet2.price - tablet2.discount);

        case SORT.PRICE_HIGH_TO_LOW:
          return (tablet2.price - tablet2.discount)
                - (tablet1.price - tablet1.discount);

        default:
          return 0;
      }
    });

    if (query) {
      currentTablets = currentTablets.filter((tablet) => {
        return tablet.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    return currentTablets;
  }, [tablets, query, sortBy]);

  const visibleTablets = getVisibleTablets();

  const startIndex = (page - 1) * +perPage;
  const endIndex = startIndex + perPage;
  const paginatedTablets = visibleTablets.slice(startIndex, +endIndex);

  const isAllDisplayed = perPage === 'all' || +perPage >= visibleTablets.length;

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        page: `${newPage}`,
      }),
    );
  };

  return (
    <div className="container">
      <BreadCrumbs />
      <h1 className="name__page">Tablets</h1>
      <p className="count__page">
        {`${visibleTablets.length} ${visibleTablets.length <= 1 ? 'model' : 'models'}`}
      </p>
      <div className="sorting">
        <div className="sorting__block">
          <div className="sorting__title">
            Sort by
          </div>
          <Dropdown
            options={optionsSorBy}
            param="sort"
            selectedOption={
              optionsSorBy.find(o => o.value === sortBy) || optionsSorBy[0]
            }
          />
        </div>

        <div className="sorting__block">
          <div className="sorting__title">
            Items on page
          </div>
          <Dropdown
            options={optionsPerPage}
            param="perPage"
            selectedOption={
              optionsPerPage.find(o => o.value === perPage)
                || optionsPerPage[0]
            }
          />
        </div>
      </div>

      {visibleTablets.length
        ? (
          <>
            <ProductList products={paginatedTablets} />
            {!isAllDisplayed
              && (
                <PageSlider
                  totalPages={Math.ceil(visibleTablets.length / +perPage)}
                  currentPage={page}
                  onPageChange={handlePageChange}
                />
              )}
          </>
        ) : (
          <h1 className="no-goods">
            No search result
          </h1>
        )}
    </div>
  );
};
