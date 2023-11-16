import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import * as goodsActions from '../../store/reducers/goodsSlice';

import { getFilteredItems } from '../../helpers/getFIlteredItems';

import { Filter } from '../../types/Filter';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { MainButton } from '../../components/Buttons/MainButton/MainButton';
import { Modal } from '../../components/Modal/Modal';
import { FilterItem } from '../../components/FilterItem/FilterItem';
import { GoodCard } from '../../components/GoodCard/GoodCard';

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
  const dispatch = useAppDispatch();
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

  const {
    goods,
    isLoaded,
    hasError,
  } = useAppSelector(state => state.goods);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  useEffect(() => {
    dispatch(goodsActions.init());
  }, [updatedAt]);

  const reload = () => {
    setUpdatedAt(new Date());
  };

  const filteredGoods = getFilteredItems(goods, filterObj);

  return (
    <main className="allGender">
      <div className="container">

        {hasError && (
          <ErrorMessage
            rootClassName="allGender__items"
            reload={reload}
          />
        )}

        {isLoaded && !hasError && (
          <Loader />
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
                goods={goods}
              />
            ))}
          </ul>
        </Modal>

        {goods.length > 0 && (
          <section className="allGender__section">
            {filteredGoods.length ? (
              <ul
                className="allGender__section-list"
              >
                {filteredGoods.map(good => {
                  const {
                    id,
                    seoUrl,
                    images,
                    name,
                    translationSlug,
                    price,
                    sale,
                  } = good;

                  return (
                    <li
                      key={id}
                      className="allGender__section-list-item"
                    >
                      <GoodCard
                        rootClassName="allGender"
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
