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

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

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
    const perPage = searchParams.get('perPage') || '4';
    const page = Number(searchParams.get('page')) || 1;
    const sortParam = searchParams.get('sort');

    const optionFromParam =
      options.find(option => option.value === perPage) || options[0];

    setSelectedOption(optionFromParam);

    const perPageNumber =
      optionFromParam.value === 'all'
        ? devices.length || 0
        : Number(optionFromParam.value);

    const safePage = page < 1 ? 1 : page;

    const newOffset =
      optionFromParam.value === 'all' ? 0 : (safePage - 1) * perPageNumber;

    setItemOffset(newOffset);

    let sortOption: OptionType | null = null;

    if (sortParam === 'title') {
      sortOption =
        sortOptions.find(option => option.label === 'Alphabetically') || null;
    } else if (sortParam === 'age') {
      sortOption =
        sortOptions.find(option => option.label === 'Newest') || null;
    } else if (sortParam === 'price') {
      sortOption =
        sortOptions.find(option => option.label === 'Cheapest') || null;
    } else {
      sortOption = null;
    }

    setSelectedSortOption(sortOption);
  }, [type, searchParams, devices.length]);

  useEffect(() => {
    setSelectedSortOption(null);
  }, [type]);

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
  const pageCount =
    itemsPerPageValue === 0
      ? 0
      : Math.ceil(sortedProducts.length / itemsPerPageValue);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    const params = new URLSearchParams(searchParams);

    params.set('page', String(newPage));
    setSearchParams(params);
  };

  const currentPageFromUrl =
    selectedOption?.value === 'all'
      ? 0
      : Math.max(0, (Number(searchParams.get('page')) || 1) - 1);

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

            {selectedOption?.value !== 'all' && pageCount > 1 && (
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
                forcePage={currentPageFromUrl}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
};
