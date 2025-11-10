import { ProductType } from '../../types/product';
import { OptionType } from '../../types/OptionType';
import SelectComponent from './componets/Select';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
import ProductList from './componets/ProductList';
import SortSelect from './componets/SortSelect';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Loader } from './componets/Loader';
import { getDevices } from '../../services/device';
// eslint-disable-next-line max-len
import { useSelectedProduct } from '../../utils/contexts/SelectedProductContext';

type Props = {
  type: string;
};

function filteredBy(products: ProductType[], filterBy: string) {
  const readyProducts = [...products];

  const filterProducts = readyProducts.filter(
    product => product.category === filterBy,
  );

  return filterProducts;
}

function getReadyProducts(products: any, typeOf: OptionType | null) {
  const readyProducts = [...products];

  if (typeOf) {
    readyProducts.sort((product1, product2) => {
      switch (typeOf.label) {
        case 'Alphabetically':
          return product1.name.localeCompare(product2.name);

        case 'Cheapest':
          return +product1.price - +product2.price;

        case 'Newest':
          return +product2.year - +product1.year;

        default:
          return 0;
      }
    });
  }

  return readyProducts;
}

const options: OptionType[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'all' },
];

const sortOptions: OptionType[] = [
  {
    value: '1',
    label: 'Newest',
  },
  {
    value: '2',
    label: 'Alphabetically',
  },
  {
    value: '3',
    label: 'Cheapest',
  },
];

export const Devices: React.FC<Props> = ({ type }) => {
  const [devices, setDevices] = useState<ProductType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<OptionType | null>({
    value: '4',
    label: '4',
  });
  const [selectedSortOption, setSelectedSortOption] =
    useState<OptionType | null>(null);
  const [itemOffset, setItemOffset] = useState(0);
  const { loading, setLoading, isError, setIsError } = useSelectedProduct();

  useEffect(() => {
    setLoading(true);
    getDevices()
      .then(products => {
        setDevices(filteredBy(products, type));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [type]);

  useEffect(() => {
    setItemOffset(0);
    const params = new URLSearchParams(searchParams);

    if (selectedOption?.value === 'all') {
      params.delete('page');
    } else {
      params.set('page', '1');
    }

    setSearchParams(params);
  }, [selectedSortOption, selectedOption]);

  const sortedProducts = getReadyProducts(devices, selectedSortOption);

  const itemsPerPageValue =
    selectedOption?.value === 'all'
      ? devices.length
      : selectedOption
        ? +selectedOption.value
        : 4;

  const endOffset = itemOffset + +itemsPerPageValue;
  const currentProducts1 =
    selectedOption?.value === 'all'
      ? sortedProducts // Якщо "all", показуємо всі продукти
      : sortedProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPageValue);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * itemsPerPageValue;
    const params = new URLSearchParams(searchParams);

    params.set('page', `${+event.selected + 1}`);
    setSearchParams(params);
    setItemOffset(newOffset);
  };

  if (isError && !loading) {
    return (
      <div className="container wrong">
        <h1 className="title--biggest wrong__header">Something went wrong</h1>
        <button className="addToCart" onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    );
  }

  if (!loading && devices.length === 0) {
    return (
      <div className="container">
        <h1>{`There are no ${type}`}</h1>
      </div>
    );
  }

  return (
    <main className="main">
      {loading ? (
        <Loader />
      ) : (
        <section className="devices">
          <div className="container">
            <div className="devices__path path">
              <NavLink to="/" className="path__home"></NavLink>
              <span className="path__arrow"></span>
              <NavLink
                to={`/${devices[0].category}`}
                className="path__type smallText"
              >
                {devices[0].category === 'phones'
                  ? 'Phones'
                  : devices[0].category === 'tablets'
                    ? 'Tablets'
                    : devices[0].category === 'accessories'
                      ? 'Accessories'
                      : ''}
              </NavLink>
            </div>

            <div className="devices__info">
              <h1 className="devices__title title--biggest">
                {devices[0].category === 'phones'
                  ? 'Mobile phones'
                  : devices[0].category === 'tablets'
                    ? 'Tablets'
                    : devices[0].category === 'accessories'
                      ? 'Accessories'
                      : ''}
              </h1>
              <span className="body-text-600 body-text-600--gray">{`${devices.length} models`}</span>
            </div>

            <div className="devices__filters">
              <div className="devices__sort-area devices__sort-area--sort">
                <label htmlFor="sortState" className="devices__label">
                  Sort by
                </label>
                <SortSelect
                  options={sortOptions}
                  selectedOption={selectedSortOption}
                  setSelectedOption={option => {
                    setSelectedSortOption(option);
                  }}
                />
              </div>
              <div className="devices__sort-area devices__sort-area--items">
                <label htmlFor="sortState" className="devices__label">
                  Items on page
                </label>
                <SelectComponent
                  options={options}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
            </div>

            <ProductList products={currentProducts1} />

            {selectedOption?.value !== 'all' && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=""
                onPageChange={handlePageClick}
                containerClassName="pagina"
                pageLinkClassName="pagina__page"
                activeLinkClassName="pagina__page--active"
                previousLinkClassName={classNames(
                  'pagina__switcher',
                  'pagina__switcher--previous',
                  {
                    'pagina__switcher--all': selectedOption?.value === 'all',
                  },
                )}
                nextLinkClassName={classNames(
                  'pagina__switcher',
                  'pagina__switcher--next',
                  {
                    'pagina__switcher--all': selectedOption?.value === 'all',
                  },
                )}
                disabledClassName="pagina__disabled"
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel=""
                renderOnZeroPageCount={null}
                forcePage={Math.floor(itemOffset / itemsPerPageValue)}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
};
