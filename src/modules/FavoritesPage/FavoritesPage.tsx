//#region Styles
import style from './favorites.module.scss';
//endregion

//#region Local Components
import { Skeleton } from '../ProductCard';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
//endregion

//#region stateApp
import { useContext, useEffect, useState } from 'react';
//endregion

//#region Context
import { ShoppingContex } from '../../context/ShoppingContex';
//endregion

//#region Global Components
import { Card, ProductsEmpty } from '@GlobalComponents';
//endregion

//#region Hooks
import { useTimer } from '../../Hooks/useTimer';
//endregion

//#region Router
import { useLocation } from 'react-router-dom';
//endregion

//#region other
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
//endregion

export const FavoritesPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation();

  const { favoritItems } = useContext(ShoppingContex);
  const { start, clear } = useTimer();

  const { pathname } = useLocation();
  const categoryName = pathname.split('/')[1];

  function createSkeleton() {
    const DEFAULT_SKELETON_COUNT = 6;

    return favoritItems.length > 0
      ? Array(favoritItems.length).fill(0)
      : Array(DEFAULT_SKELETON_COUNT).fill(0);
  }

  useEffect(() => {
    setLoading(true);

    start(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clear();
    };
  }, [clear, start]);

  return (
    <>
      <main className={style.main}>
        <section className="section">
          <div className="container">
            <ToastContainer />
            <div className={style.wrapper}>
              {isLoading ? (
                <div className={style.items}>
                  {createSkeleton().map((_, index) => (
                    <Skeleton key={index} />
                  ))}
                </div>
              ) : favoritItems.length === 0 ? (
                <ProductsEmpty title={t(`categoryDevice.${categoryName}`)} />
              ) : (
                <>
                  <Breadcrumb />
                  <h1 className={`title ${style.title}`}>
                    {t(`categoryDevice.${categoryName}`)}
                  </h1>
                  <span className={style.quantity}>
                    {favoritItems.length} {t('page.quantity')}
                  </span>
                  <ul className={style.items}>
                    {favoritItems.map(item => (
                      <li key={item.id}>
                        <Card key={item.id} title="" item={item} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
