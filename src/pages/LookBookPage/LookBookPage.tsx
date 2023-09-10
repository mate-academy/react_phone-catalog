import React, { useState, useEffect } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

import { getData } from '../../helpers/httpClient';
import { makeAlt } from '../../helpers/makeAlt';
import { ITEMS_PER_PAGE, loadMore } from '../../helpers/Pagination';

import { Preview } from '../../types/Preview';

import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import './LookBookPage.scss';

export const LookBookPage: React.FC = React.memo(() => {
  const [photos, setPhotos] = useState<Preview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScrollEnd = () => loadMore(
    ITEMS_PER_PAGE,
    currentPage,
    totalItemsCount,
  ) && setCurrentPage(prevPage => prevPage + 1);

  const reload = () => {
    setHasError(false);
    setUpdatedAt(new Date());
  };

  useEffect(() => {
    setIsLoading(true);

    getData<Preview[]>('previews')
      .then(response => {
        setTotalItemsCount(response.length);

        setPhotos(prevPhotos => [
          ...prevPhotos,
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
    <main className="lookBook">
      <div className="container grid">
        {hasError && (
          <ErrorMessage
            rootClassName="lookBook__items"
            reload={reload}
          />
        )}

        {photos.length > 0 && (
          <section className="lookBook__section">
            <VirtuosoGrid
              style={{
                height: 'min-content',
              }}
              data={photos}
              useWindowScroll
              totalCount={photos.length}
              overscan={6}
              listClassName="lookBook__section-list"
              itemClassName="lookBook__section-list-item"
              endReached={handleScrollEnd}
              components={{
                Footer: () => (isLoading ? (<Loader />) : null),
              }}
              itemContent={(index, photo) => {
                const { link } = photo;

                return (
                  <React.Fragment
                    key={index}
                  >
                    <img
                      className="lookBook__section-list-item-image"
                      src={link}
                      alt={makeAlt(link)}
                    />
                  </React.Fragment>
                );
              }}
            />
          </section>
        )}
      </div>
    </main>
  );
});
