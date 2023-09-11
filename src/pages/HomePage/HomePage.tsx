import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { makeUrl } from '../../helpers/makeUrl';
import { makeAlt } from '../../helpers/makeAlt';
import { getData } from '../../helpers/httpClient';

import { NavLink } from '../../types/NavLink';
import { Preview } from '../../types/Preview';

import { Player } from '../../components/Player/Player';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Modal } from '../../components/Modal/Modal';

import './HomePage.scss';

export const HomePage: React.FC = React.memo(() => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const [previews, setPreviews] = useState<Preview[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getData<Preview[]>('previews')
      .then(response => setPreviews(response.slice(0, 6)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [updatedAt]);

  const reload = () => {
    setUpdatedAt(new Date());
    setHasError(false);
  };

  const handleButtonClick = (link: string) => {
    setSelectedImageUrl(link);
    setIsModalActive(true);
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
            <ErrorMessage
              reload={reload}
              rootClassName="homePage__gallery"
            />
          )}

          <Modal
            active={isModalActive}
            setActive={setIsModalActive}
            withoutBackground
          >
            <img
              className="homePage__modal-image"
              src={selectedImageUrl}
              alt={makeAlt(selectedImageUrl)}
            />
          </Modal>

          {!isLoading && previews.length > 0 && (
            <ul className="homePage__gallery-list">
              {previews.map(preview => {
                const { link, id } = preview;

                return (
                  <li
                    className="homePage__gallery-list-item"
                    key={id}
                  >
                    <button
                      className="homePage__gallery-list-item-button"
                      type="button"
                      onClick={() => handleButtonClick(link)}
                    >
                      <img
                        className="homePage__gallery-list-item-image"
                        src={link}
                        alt={makeAlt(link)}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
});
