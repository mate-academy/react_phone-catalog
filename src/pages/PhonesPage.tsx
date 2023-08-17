import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getProducts } from '../api/getData';
import { Product } from '../types/Product';
import { SearchLink } from '../components/SearchLink';
import { getSearchWith } from '../helpers/searchHelper';
import { Catalog } from '../components/Catalog';
import { Navigation } from '../components/Navigation';
import { Dropdown } from '../components/Dropdown';

export const PhonesPage: React.FC = () => {
  const [catalog, setCatalog] = useState<Product[]>(
    JSON.parse(localStorage.getItem('fullList') || ''),
  );

  const getData = async () => {
    const result = await getProducts();

    setCatalog(result);
  };

  useEffect(() => {
    if (catalog.length === 0) {
      getData();
    }
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'Default';
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const itemPerPage = parseInt(searchParams.get('itemPerPage') || '12', 10);

  const goToTheFirstPage = () => {
    setSearchParams(getSearchWith(searchParams, { currentPage: '1' }));
  };

  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(itemPerPage);

  const handleCurrentPageChange = (value: number | string) => {
    let newValue;

    switch (true) {
      case typeof value === 'number':
        newValue = value;
        break;

      case value === 'left':
        newValue = currentPage - 1;
        break;

      case value === 'right':
        newValue = currentPage + 1;
        break;

      default:
        break;
    }

    setSearchParams(getSearchWith(searchParams,
      { currentPage: String(newValue) }));
  };

  const handleCatalogTurn = () => {
    setStart(itemPerPage * (currentPage - 1));
    setEnd(itemPerPage * currentPage);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    handleCatalogTurn();
  }, [currentPage]);

  const [sortedCatalog, setSortedCatalog] = useState<Product[]>([...catalog]);
  const pagesAmount = Math.ceil(sortedCatalog.length / itemPerPage);

  useEffect(() => {
    switch (sortBy) {
      case 'Newest':
        setSortedCatalog([...catalog].sort(
          (item1, item2) => item2.year - item1.year,
        ));
        break;

      case 'Highest Price':
        setSortedCatalog([...catalog].sort(
          (item1, item2) => item2.price - item1.price,
        ));
        break;

      case 'Lowest Price':
        setSortedCatalog([...catalog].sort(
          (item1, item2) => item1.price - item2.price,
        ));
        break;

      default:
        setSortedCatalog([...catalog]);
        break;
    }

    goToTheFirstPage();
  }, [sortBy]);

  useEffect(() => {
    goToTheFirstPage();
    setEnd(itemPerPage);
  }, [itemPerPage]);

  useEffect(() => {
    setSortedCatalog(
      catalog.filter(
        item => item.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    goToTheFirstPage();
  }, [query]);

  return (
    <div>
      <Navigation />
      <main className="page">
        <section className="phones">
          <div className="phones__header">
            <div>
              <h1>Mobile phones</h1>
              <p className="text__body phones__header__subtitle">
                {`${sortedCatalog.length} models`}
              </p>
            </div>
            {sortedCatalog.length > 0 && (
              <div className="phones__header__dropdowns">
                <Dropdown type="sortBy" />
                <Dropdown type="itemPerPage" />
              </div>
            )}
          </div>

          <div className="phones__catalog">
            {sortedCatalog && (
              <Catalog
                catalog={sortedCatalog}
                start={start}
                end={end}
              />
            )}

            {sortedCatalog.length > 0 && (
              <div className="phones__catalog__buttons">
                <button
                  type="button"
                  aria-label="slider-button"
                  className="slider-button slider-button__left"
                  disabled={searchParams.get('currentPage') === '1'}
                  onClick={() => handleCurrentPageChange('left')}
                />
                <div className="phones__catalog__buttons__paggination">
                  {Array
                    .from({ length: pagesAmount }, (_, i) => i + 1)
                    .map(num => (
                      <SearchLink
                        className={classNames(
                          'slider-button slider-button__paggination', {
                            active:
                              searchParams.get('currentPage') === String(num),
                          },
                        )}
                        key={num}
                        onClick={() => handleCurrentPageChange(num)}
                        params={{ currentPage: String(num) }}
                      >
                        {num}
                      </SearchLink>
                    ))}
                </div>

                <button
                  aria-label="slider-button"
                  className="slider-button slider-button__right"
                  disabled={
                    searchParams.get('currentPage') === String(pagesAmount)
                  }
                  type="button"
                  onClick={() => handleCurrentPageChange('right')}
                />
              </div>
            )}
          </div>
        </section>

        <section />
      </main>
    </div>
  );
};
