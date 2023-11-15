import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VirtuosoGrid } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import * as goodsActions from '../../store/reducers/goodsSlice';

import { ITEMS_PER_PAGE, loadMore } from '../../helpers/Pagination';
import { getFilteredItems } from '../../helpers/getFIlteredItems';

import { Good } from '../../types/Good';
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
    goods: totalGoods,
    isLoaded,
    hasError,
  } = useAppSelector(state => state.goods);
  const [renderedGoods, setRenderedGoods] = useState<Good[]>([]);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(goodsActions.init());
      setTotalItemsCount(totalGoods.length);

      setRenderedGoods(prevGoods => [
        ...prevGoods,
        ...totalGoods.slice(
          currentPage * ITEMS_PER_PAGE,
          (currentPage + 1) * ITEMS_PER_PAGE,
        ),
      ]);
    };

    fetchData();
  }, [updatedAt, currentPage]);

  const reload = () => {
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
                  Footer: () => (isLoaded ? (<Loader />) : null),
                }}
                itemContent={(index, good) => {
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
                    <GoodCard
                      key={index + id}
                      rootClassName="allGender"
                      seoUrl={seoUrl}
                      currentLanguage={currentLanguage}
                      imageLink={images[0]}
                      name={name}
                      translationSlug={translationSlug}
                      sale={sale}
                      price={price}
                    />
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
