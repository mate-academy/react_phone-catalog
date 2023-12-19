import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { TechProduct } from '../../types/TechProduct';
import { TechProductsContext } from '../../stores/TechProductsContext';
import { ProductCard } from '../ProductCard/ProductCard';
import { Pagination } from '../Pagination/Pagination';
import { perPageArr, sortByArr } from '../../vars/variables';
import './ProductList.scss';

type Props = {
  products: TechProduct[],
};

function sortedProducts(
  products: TechProduct[],
  { sort }: { sort: string },
) {
  let copyProducts = [...products];

  if (sort) {
    copyProducts = copyProducts.sort((product1, product2) => {
      switch (sort) {
        case 'age':
          return product2.year - product1.year;
        case 'name':
          return (product1.name).localeCompare(product2.name);
        case 'price':
          return product1.price - product2.price;
        default:
          return product2.year - product1.year;
      }
    });
  }

  return copyProducts;
}

export const ProductList:React.FC<Props> = ({
  products,
}) => {
  const {
    query,
    perPage,
    page,
    sort,
    setSearchWith,
  } = useContext(TechProductsContext);

  const [focusSort, setFocusSort] = useState(false);
  const dropdownSort = useRef<HTMLDivElement>(null);

  const [focusCountsItems, setFocusCountsItems] = useState(false);
  const dropdownCountsItems = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdownSort.current
        && focusSort
        && !dropdownSort.current.contains(e.target as Node)) {
        setFocusSort(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [focusSort]);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdownCountsItems.current
        && focusCountsItems
        && !dropdownCountsItems.current.contains(e.target as Node)) {
        setFocusCountsItems(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [focusCountsItems]);

  const handleSortsFocus = () => {
    if (focusSort) {
      setFocusSort(false);
    } else {
      setFocusSort(true);
    }
  };

  const handleCountsItemsFocus = () => {
    if (focusCountsItems) {
      setFocusCountsItems(false);
    } else {
      setFocusCountsItems(true);
    }
  };

  const handleDropdownSort = (param: string) => {
    setSearchWith({ sort: param || null });

    setFocusSort(false);
  };

  const handleDropdownPerPage = (Perpage: string) => {
    setSearchWith({
      perPage: Perpage || null,
      page: '1' || null,
    });

    setFocusCountsItems(false);
  };

  const sortStrings = sortByArr.find((arr) => arr.param === sort);
  const countsItems = perPageArr.find((arr) => arr === perPage);

  const visibleProducts = sortedProducts(products, { sort });

  const startIndex = (+perPage * +page - +perPage + 1);
  const endIndex = (+perPage * +page);

  const slicedProducts = (perPage !== 'all')
    ? visibleProducts.slice(startIndex - 1, endIndex)
    : visibleProducts;

  return (
    <div className="products">
      {
        query && (
          <h3 className="products__count-models">
            {`${products.length} results`}
          </h3>
        )
      }

      {
        !query && (
          <div
            className="products__settings-for-output"
          >
            <div className="grid-cover">
              <div className="products__selects-container">
                <div className="products__select-sort-container">
                  <h3 className="products__title-sort-select">
                    Sort by
                  </h3>

                  <div
                    className="products__dropdown-container
                      products__dropdown-container--sort"
                    ref={dropdownSort}
                  >
                    <button
                      onClick={handleSortsFocus}
                      type="button"
                      className={
                        classNames(
                          'products__dropdown-button',
                          {
                            // eslint-disable-next-line
                            'products__dropdown-button products__dropdown-button--active':
                            focusSort,
                          },
                        )
                      }
                    >
                      <span className="products__dropdown-value">
                        {sortStrings?.sortBy}
                      </span>

                      <span
                        className={
                          classNames(
                            'icon icon--arrow-down',
                            {
                              'icon icon--select-arrow-up':
                              focusSort,
                            },
                          )
                        }
                      />
                    </button>

                    <div
                      className={
                        classNames(
                          'products__dropdown-content',
                          {
                            'products__dropdown-content--active':
                            focusSort,
                          },
                        )
                      }
                    >
                      {
                        sortByArr.map((sOrt) => {
                          const { param, sortBy } = sOrt;

                          return (
                            <button
                              type="button"
                              className="products__dropdown-link"
                              onClick={() => handleDropdownSort(param)}
                              key={param}
                            >
                              {sortBy}
                            </button>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>

                <div className="products__select-count-items-container">
                  <h3 className="products__title-items-select">
                    Items on page
                  </h3>

                  <div
                    className="products__dropdown-container
                      products__dropdown-container--counts-items"
                    ref={dropdownCountsItems}
                  >
                    <button
                      onClick={handleCountsItemsFocus}
                      type="button"
                      className={
                        classNames(
                          'products__dropdown-button',
                          {
                            // eslint-disable-next-line
                            'products__dropdown-button products__dropdown-button--active':
                            focusCountsItems,
                          },
                        )
                      }
                    >
                      <span className="products__dropdown-value">
                        {countsItems}
                      </span>

                      <span
                        className={
                          classNames(
                            'icon icon--arrow-down',
                            {
                              'icon icon--select-arrow-up':
                              focusCountsItems,
                            },
                          )
                        }
                      />
                    </button>

                    <div
                      className={
                        classNames(
                          'products__dropdown-content',
                          {
                            'products__dropdown-content--active':
                            focusCountsItems,
                          },
                        )
                      }
                    >
                      {
                        perPageArr.map((perPAge) => {
                          return (
                            <button
                              type="button"
                              className="products__dropdown-link"
                              onClick={() => handleDropdownPerPage(perPAge)}
                              key={perPAge}
                            >
                              {perPAge}
                            </button>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      <div
        data-cy="productList"
        className="flex-products-container"
      >
        {
          slicedProducts.map((product) => {
            return (
              <ProductCard
                key={product.itemId}
                product={product}
              />
            );
          })
        }
      </div>

      {
        !query && perPage !== 'all' && (
          <Pagination
            visibleProducts={visibleProducts}
          />
        )
      }
    </div>
  );
};
