import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';
import { SORT, optionsSorBy } from '../../utils/Sort';
import { Dropdown } from '../../components/Dropdown';
import { PageSlider } from '../../components/PageSlider';
import { getSearchWith } from '../../helpers/searchHelper';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];
  const perPage = searchParams.get('perPage') || '16';

  const phones = products.filter(
    (product: Product) => product.type === 'phone',
  );

  const optionsPerPage = [
    { label: 'all', value: `${phones.length}` },
    { label: '4', value: '4' },
    { label: '8', value: '8' },
    { label: '16', value: '16' },
  ];

  const page = +(searchParams.get('page') || 1);

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || 'age';

  const getVisiblePhones = useCallback(() => {
    let currentPhones: Product[] = [...phones];

    currentPhones = currentPhones.sort((phone1, phone2) => {
      switch (sortBy) {
        case SORT.ALPHABETICALLY:
          return phone1.name.localeCompare(phone2.name);

        case SORT.NEWEST:
          return phone1.age - phone2.age;

        case SORT.OLDEST:
          return phone2.age - phone1.age;

        case SORT.PRICE_LOW_TO_HIGH:
          return (phone1.price - phone1.discount)
              - (phone2.price - phone2.discount);

        case SORT.PRICE_HIGH_TO_LOW:
          return (phone2.price - phone2.discount)
              - (phone1.price - phone1.discount);

        default:
          return 0;
      }
    });

    if (query) {
      currentPhones = currentPhones.filter((phone) => {
        return phone.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    return currentPhones;
  }, [products, query, sortBy]);

  const visiblePhones = getVisiblePhones();

  const startIndex = (page - 1) * +(page === 1 ? perPage : +perPage);
  const endIndex = startIndex + +perPage;
  const paginatedPhones = visiblePhones.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        page: `${newPage}`,
      }),
    );
  };

  const isAllDisplayed = perPage === 'all' || +perPage >= visiblePhones.length;

  return (
    <div className="container">
      <BreadCrumbs />
      <h1 className="name__page">Mobile phones</h1>
      <p className="count__page">
        {`${visiblePhones.length} ${visiblePhones.length <= 1 ? 'model' : 'models'}`}
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

      {visiblePhones.length
        ? (
          <>
            <ProductList products={paginatedPhones} />

            {!isAllDisplayed
              && (
                <PageSlider
                  totalPages={Math.ceil(visiblePhones.length / +perPage)}
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
