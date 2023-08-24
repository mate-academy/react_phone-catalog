import React, { useState, useEffect } from 'react';

import { getData } from '../../helpers/httpClient';
import { makeAlt } from '../../helpers/makeAlt';
import { Preview } from '../../types/Preview';

import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import './LookBookPage.scss';

export const LookBookPage: React.FC = React.memo(() => {
  const [photos, setPhotos] = useState<Preview[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight
      - (
        document.documentElement.scrollTop
        + window.innerHeight
      ) < 100
    ) {
      setFetching(true);
    }
  };

  const reload = () => {
    setHasError(false);
    setUpdatedAt(new Date());
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    if (fetching) {
      setCurrentPage(prevState => prevState + 1);
    }
  }, [fetching]);

  useEffect(() => {
    setIsLoading(true);

    getData<Preview[]>('previews')
      .then(response => {
        setPhotos(prevPhotos => [
          ...prevPhotos,
          ...response.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE,
          ),
        ]);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [updatedAt, fetching]);

  return (
    <main className="lookBook">
      <div className="container grid">
        {isLoading && (
          <Loader />
        )}

        {hasError && (
          <ErrorMessage
            rootClassName="lookBook__items"
            reload={reload}
          />
        )}

        {!isLoading && photos.length > 0 && (
          <main
            className="lookBook"
          >
            <section
              className="lookBook__section"
            >
              <ul className="lookBook__section-list">
                {photos.map(photo => {
                  const { link, id } = photo;

                  return (
                    <li
                      className="lookBook__section-list-item"
                      key={id}
                    >
                      <img
                        className="lookBook__section-list-item-image"
                        src={link}
                        alt={makeAlt(link)}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          </main>
        )}
      </div>
    </main>
  );
});
