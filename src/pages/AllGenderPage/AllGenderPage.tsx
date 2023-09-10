import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { VirtuosoGrid } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';

import { getData } from '../../helpers/httpClient';
import { ITEMS_PER_PAGE, loadMore } from '../../helpers/Pagination';
import { giveCurrency } from '../../helpers/giveCurrency';

import { Good } from '../../types/Good';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';

import './AllGenderPage.scss';

export const AllGenderPage: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  const [goods, setGoods] = useState<Good[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const reload = () => {
    setHasError(false);
    setUpdatedAt(new Date());
  };

  const handleScrollEnd = () => loadMore(
    ITEMS_PER_PAGE,
    currentPage,
    totalItemsCount,
  ) && setCurrentPage(prevPage => prevPage + 1);

  useEffect(() => {
    setIsLoading(true);

    getData<Good[]>('goods')
      .then(response => {
        setTotalItemsCount(response.length);

        setGoods(prevGoods => [
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

  return (
    <main className="allGender">
      <div className="container">
        {hasError && (
          <ErrorMessage
            rootClassName="allGender__items"
            reload={reload}
          />
        )}

        {goods.length > 0 && (
          <section className="allGender__section">
            <VirtuosoGrid
              style={{
                height: 'min-content',
              }}
              data={goods}
              useWindowScroll
              totalCount={goods.length}
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

            <MainButton
              className="allGender__section-button"
              button
              onClick={() => { }}
              text={t('filter')}
            />
          </section>
        )}
      </div>
    </main>
  );
});
