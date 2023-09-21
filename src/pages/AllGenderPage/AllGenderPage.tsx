import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { VirtuosoGrid } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';

import { getData } from '../../helpers/httpClient';
import { ITEMS_PER_PAGE, loadMore } from '../../helpers/Pagination';
import { giveCurrency } from '../../helpers/giveCurrency';
import { getFilteredItems } from '../../helpers/getFIlteredItems';

import { Good } from '../../types/Good';
import { Filter } from '../../types/Filter';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';
import { Modal } from '../../components/Modal/Modal';
import { FilterItem } from '../../components/FilterItem/FilterItem';

import './AllGenderPage.scss';

const filterItems = [
  'type',
  'drop',
  'sizes',
  'colors',
  'year',
];

export const AllGenderPage: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const currentLanguage = searchParams.get('lang') || 'en';
  const types = searchParams.getAll('type') || [];
  const drop = searchParams.getAll('drop') || [];
  const sizes = searchParams.getAll('sizes') || [];
  const colors = searchParams.getAll('colors') || [];
  const year = searchParams.getAll('year') || [];

  const filterObj: Filter = {
    type: types,
    drop,
    sizes,
    colors,
    year,
  };

  const [totalGoods, setTotalGoods] = useState<Good[]>([]);
  const [renderedGoods, setRenderedGoods] = useState<Good[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getData<Good[]>('goods')
      .then(response => {
        setTotalGoods(response);
        setTotalItemsCount(response.length);

        setRenderedGoods(prevGoods => [
          ...prevGoods,
          ...response.slice(
            currentPage * ITEMS_PER_PAGE,
            (currentPage + 1) * ITEMS_PER_PAGE,
          ),
        ]);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [updatedAt, currentPage]);

  const reload = () => {
    setHasError(false);
    setUpdatedAt(new Date());
  };

  const handleScrollEnd = () => loadMore(
    ITEMS_PER_PAGE,
    currentPage,
    totalItemsCount,
  ) && setCurrentPage(prevPage => prevPage + 1);

  const filteredGoods = getFilteredItems(renderedGoods, filterObj);

  return (
    <main className="allGender">
      <div className="container">
        {hasError && (
          <ErrorMessage
            rootClassName="allGender__items"
            reload={reload}
          />
        )}

        <Modal
          active={isFilterOpened}
          setActive={setIsFilterOpened}
        >
          <ul className="allGender__filter-list">
            {filterItems.map(item => (
              <FilterItem
                key={item}
                rootClassName="allGender"
                item={item}
                goods={totalGoods}
              />
            ))}
          </ul>
        </Modal>

        {renderedGoods.length > 0 && (
          <section className="allGender__section">
            {filteredGoods.length ? (
              <VirtuosoGrid
                style={{
                  height: 'min-content',
                }}
                data={filteredGoods}
                useWindowScroll
                totalCount={renderedGoods.length}
                overscan={6}
                listClassName="allGender__section-list"
                itemClassName="allGender__section-list-item"
                endReached={handleScrollEnd}
                components={{
                  Footer: () => (isLoading ? (<Loader />) : null),
                }}
                itemContent={(index, good) => {
                  const {
                    name,
                    images,
                    id,
                    price,
                    seoUrl,
                    translationSlug,
                  } = good;

                  return (
                    <Link
                      className="allGender__section-list-item-link"
                      to={{
                        pathname: seoUrl,
                        search: `?lang=${currentLanguage}`,
                      }}
                      key={id + index}
                    >
                      <img
                        className="allGender__section-list-item-image"
                        src={images[0]}
                        alt={name}
                      />

                      <h2 className="allGender__section-list-item-header">
                        {t(translationSlug)}
                      </h2>

                      <p className="allGender__section-list-item-price">
                        {`${t(price.toString())} ${giveCurrency(currentLanguage)}`}
                      </p>
                    </Link>
                  );
                }}
              />
            ) : (
              <p className="allGender__section-error-message">
                {t('noGoods')}
              </p>
            )}

            <MainButton
              className="allGender__section-button"
              button
              onClick={() => setIsFilterOpened(true)}
              text={t('filter')}
            />
          </section>
        )}
      </div>
    </main>
  );
});
