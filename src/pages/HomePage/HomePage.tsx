import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import { makeUrl } from '../../helpers/makeUrl';
import { makeAlt } from '../../helpers/makeAlt';
import { getData } from '../../helpers/httpClient';
import { getScreenType } from '../../helpers/getScreenType';
import { giveCurrency } from '../../helpers/giveCurrency';

import { NavLink } from '../../types/NavLink';
import { Preview } from '../../types/Preview';
import { Good } from '../../types/Good';
import { Resolutions } from '../../types/Resolutions';

import { Player } from '../../components/Player/Player';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Modal } from '../../components/Modal/Modal';

import './HomePage.scss';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import './slider.scss';

export const HomePage: React.FC = React.memo(() => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const currentLanguage = searchParams.get('lang') || 'en';

  const [goods, setGoods] = useState<Good[]>([]);

  const [previews, setPreviews] = useState<Preview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getData<Good[]>('goods')
      .then(response => {
        setGoods(response.slice(0, 5));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));

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

        <section className="homePage__goods page__section">
          {isLoading && (
            <Loader />
          )}

          {hasError && (
            <ErrorMessage
              reload={reload}
              rootClassName="homePage__goods"
            />
          )}

          {!isLoading && goods.length > 0 && (
            getScreenType() === Resolutions.Mobile ? (
              <Swiper
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{ clickable: true }}
              >
                {goods.map(good => {
                  const {
                    images,
                    name,
                    id,
                    seoUrl,
                    translationSlug,
                    price,
                  } = good;

                  return (
                    <SwiperSlide
                      className="homePage__goods-list-item"
                      key={id}
                    >
                      <Link
                        className="homePage__goods-list-item-link"
                        to={{
                          pathname: seoUrl,
                          search: `?lang=${currentLanguage}`,
                        }}
                      >
                        <img
                          className="homePage__goods-list-item-image"
                          src={images[0]}
                          alt={name}
                        />

                        <div className="homePage__goods-list-item-info">
                          <h2 className="homePage__goods-list-item-info-header">
                            {t(translationSlug)}
                          </h2>

                          <p className="homePage__goods-list-item-info-price">
                            {`${t(price.toString())} ${giveCurrency(currentLanguage)}`}
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <ul className="homePage__goods-list">
                {goods.map(good => {
                  const {
                    images,
                    name,
                    id,
                    seoUrl,
                    translationSlug,
                    price,
                  } = good;

                  return (
                    <li
                      className="homePage__goods-list-item"
                      key={id}
                    >
                      <Link
                        className="homePage__goods-list-item-link"
                        to={{
                          pathname: seoUrl,
                          search: `?lang=${currentLanguage}`,
                        }}
                      >
                        <img
                          className="homePage__goods-list-item-image"
                          src={images[0]}
                          alt={name}
                        />

                        <div className="homePage__goods-list-item-info">
                          <h2 className="homePage__goods-list-item-info-header">
                            {t(translationSlug)}
                          </h2>

                          <p className="homePage__goods-list-item-info-price">
                            {`${t(price.toString())} ${giveCurrency(currentLanguage)}`}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )
          )}
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
