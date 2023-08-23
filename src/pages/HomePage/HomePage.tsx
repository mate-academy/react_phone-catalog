import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { makeUrl } from '../../helpers/makeUrl';
import { makeAlt } from '../../helpers/makeAlt';
import { getData } from '../../helpers/httpClient';

import { NavLink } from '../../types/NavLink';

import { Player } from '../../components/Player/Player';
import { Loader } from '../../components/Loader/Loader';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';

import './HomePage.scss';

export const HomePage: React.FC = React.memo(() => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const [previews, setPreviews] = useState<string[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    setIsLoading(true);

    getData<string[]>('previews')
      .then(response => setPreviews(response.slice(0, 6)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [updatedAt]);

  const reload = () => {
    setUpdatedAt(new Date());
    setHasError(false);
  };

  return (
    <main
      className="homePage"
    >
      <div className="container grid">
        <section className="homePage__player page__section">
          <Player />
        </section>

        <section className="homePage__gallery page__section">
          <div className="homePage__gallery-info">
            <h2 className="homePage__gallery-info-title">
              {t('Looks')}
            </h2>

            <Link
              to={{
                pathname: makeUrl(NavLink.LookBook),
                search: searchParams.toString(),
              }}
              className="homePage__gallery-info-link"
            >
              {t('ViewAll')}
            </Link>
          </div>

          {isLoading && (
            <Loader />
          )}

          {hasError && (
            <div className="homePage__gallery-error-container grid">
              <p className="homePage__gallery-error-text">
                {t('Later')}
              </p>

              <MainButton
                className="homePage__gallery-error-button"
                button
                text={t('LaterButton')}
                onClick={reload}
              />
            </div>
          )}

          {!isLoading && previews.length > 0 && (
            <ul className="homePage__gallery-list">
              {previews.map(preview => (
                <li
                  className="homePage__gallery-list-item"
                  key={preview}
                >
                  <button
                    className="homePage__gallery-list-item-button"
                    type="button"
                  >
                    <img
                      className="homePage__gallery-list-item-image"
                      src={preview}
                      alt={makeAlt(preview)}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
});
