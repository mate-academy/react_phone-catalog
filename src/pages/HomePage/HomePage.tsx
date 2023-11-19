import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import * as goodsActions from '../../store/reducers/goodsSlice';
import * as previewsActions from '../../store/reducers/previewsSlice';

import { makeUrl } from '../../helpers/makeUrl';
import { makeAlt } from '../../helpers/makeAlt';
import { getScreenType } from '../../helpers/getScreenType';

import { NavLink } from '../../types/NavLink';
import { Resolutions } from '../../types/Resolutions';

import { Player } from '../../components/Player/Player';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Modal } from '../../components/Modal/Modal';
import { Slider } from '../../components/Slider/Slider';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';
import { GoodCard } from '../../components/GoodCard/GoodCard';

import './HomePage.scss';

export const HomePage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const {
    goods,
    isLoaded: goodsIsLoaded,
    hasError: goodsHasError,
  } = useAppSelector(state => state.goods);
  const {
    previews,
    isLoaded: previewsIsLoaded,
    hasError: previewsHasError,
  } = useAppSelector(state => state.previews);

  const previewsForHomePage = previews.slice(0, 6);

  useEffect(() => {
    dispatch(goodsActions.init());
    dispatch(previewsActions.init());
  }, [updatedAt]);

  const reload = () => {
    setUpdatedAt(new Date());
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
          {goodsIsLoaded && (
            <Loader />
          )}

          {goodsHasError && (
            <ErrorMessage
              reload={reload}
              rootClassName="homePage__goods"
            />
          )}

          {!goodsIsLoaded && goods.length > 0 && (
            getScreenType() === Resolutions.Mobile ? (
              <Slider
                goods={goods}
                rootClassName="homePage"
              />
            ) : (
              <ul className="homePage__goods-list">
                {goods.map(good => {
                  const {
                    images,
                    name,
                    id,
                    seoUrl,
                    translationSlug,
                    sale,
                    price,
                  } = good;

                  return (
                    <li
                      className="homePage__goods-list-item"
                      key={id}
                    >
                      <GoodCard
                        rootClassName="homePage"
                        seoUrl={seoUrl}
                        currentLanguage={currentLanguage}
                        imageLink={images[0]}
                        name={name}
                        translationSlug={translationSlug}
                        sale={sale}
                        price={price}
                      />
                    </li>
                  );
                })}
              </ul>
            )
          )}

          <MainButton
            text={t('ViewAll')}
            where={makeUrl(NavLink.AllGender)}
            className="homePage__goods-button"
          />
        </section>

        <section className="homePage__gallery">
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

          {previewsIsLoaded && (
            <Loader />
          )}

          {previewsHasError && (
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

          {!previewsIsLoaded && previews.length > 0 && (
            <ul className="homePage__gallery-list">
              {previewsForHomePage.map(preview => {
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
