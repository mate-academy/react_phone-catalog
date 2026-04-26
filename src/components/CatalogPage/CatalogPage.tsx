import { useSearchParams } from 'react-router-dom';
import styles from './CatalogPage.module.scss';
import { useFilters } from '../../hooks/useFilters';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { prepereProducts } from '../../utils/prepereProducts';
import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../contexts/products/ProductsStore';
import { ProductPreview } from '../../types';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CatalogPager } from './CatalogPager';
import { TopPage } from '../TopPage';

type Props = {
  category: string;
  title: string;
};

export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sort, items, query } = useFilters();
  const { products } = useContext(ProductsContext);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const filteredProducts: ProductPreview[] = useMemo(() => {
    let list = products;

    if (query) {
      list = list.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (sort) {
      case 'newest':
        return prepereProducts(list, category, 'year-desc');

      case 'alphabetically':
        return prepereProducts(list, category, 'name-abc');

      case 'cheapest':
        return prepereProducts(list, category, 'price-abc');

      default:
        return prepereProducts(list, category, 'year-desc');
    }
  }, [category, products, query, sort]);

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetically', label: 'Alphabetically' },
    { value: 'cheapest', label: 'Cheapest' },
  ];

  const itemsOptions = [
    { value: '16', label: '16' },
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: 'all', label: 'All' },
  ];

  return (
    <div className={styles.catalog}>
      <TopPage category={category} title={title} products={filteredProducts} />

      <div className={styles.catalog__sliderContainer}>
        <div className={styles.catalog__sliderSelectors}>
          <div className={styles.catalog__sliderSelectorsContaier}>
            <label
              htmlFor="sort-select"
              className={styles.catalog__SelectorsLabel}
            >
              Sort by
            </label>
            <Listbox
              value={sort || 'newest'}
              onChange={value =>
                value === 'newest'
                  ? setSearchWith({ sort: null })
                  : setSearchWith({ sort: value })
              }
            >
              {({ open }) => (
                <>
                  <ListboxButton
                    className={`${styles.catalog__sliderSortSelector} ${open ? styles.catalog__menuActive : ''}`}
                  >
                    {sortOptions.find(
                      option => option.value === (sort ?? 'newest'),
                    )?.label || 'Newest'}
                    <div
                      className={`${styles.catalog__sliderSortIcon} ${open ? styles.catalog__menuIconActive : ''}`}
                    />
                  </ListboxButton>

                  <ListboxOptions
                    anchor="bottom"
                    className={styles.catalog__sliderSortOptions}
                  >
                    {sortOptions.map(option => (
                      <ListboxOption
                        key={option.value}
                        value={option.value}
                        className={styles.catalog__SliderSortOption}
                      >
                        {option.label}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </>
              )}
            </Listbox>
          </div>

          <div className={styles.catalog__sliderSelectorsContaier}>
            <label
              htmlFor="items-select"
              className={styles.catalog__SelectorsLabel}
            >
              Items on page
            </label>
            <Listbox
              value={items || '16'}
              onChange={value =>
                value === 'all'
                  ? setSearchWith({ items: null })
                  : setSearchWith({ items: value })
              }
            >
              {({ open }) => (
                <>
                  <ListboxButton
                    className={`${styles.catalog__sliderSortSelector} ${open ? styles.catalog__menuActive : ''}`}
                  >
                    {itemsOptions.find(
                      option => option.value === (items ?? 'all'),
                    )?.label || 'All'}
                    <div
                      className={`${styles.catalog__sliderSortIcon} ${open ? styles.catalog__menuIconActive : ''}`}
                    />
                  </ListboxButton>

                  <ListboxOptions
                    anchor="bottom"
                    className={styles.catalog__sliderSortOptions}
                  >
                    {itemsOptions.map(option => (
                      <ListboxOption
                        key={option.value}
                        value={option.value}
                        className={styles.catalog__SliderSortOption}
                      >
                        {option.label}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </>
              )}
            </Listbox>
          </div>
        </div>

        <CatalogPager products={filteredProducts} category={category} />
      </div>
    </div>
  );
};
