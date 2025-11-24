import style from './favorites.module.scss';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { useContext, useEffect, useState } from 'react';
import { ShoppingContex } from '../../context/ShoppingContex';
import { Card, ProductsEmpty } from '@GlobalComponents';
import { Products } from '../../types/products';
import { ToastContainer } from 'react-toastify';
import { useTimer } from '../../Hooks/useTimer';
import { Skeleton } from '../ProductCard';
import { useLocation } from 'react-router-dom';

export const FavoritesPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

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
                <ProductsEmpty title={categoryName} />
              ) : (
                <>
                  <Breadcrumb />
                  <h1 className={`title ${style.title}`}>Favorites</h1>
                  <span className={style.quantity}>
                    {favoritItems.length} items
                  </span>
                  <ul className={style.items}>
                    {favoritItems.map(item => (
                      <li key={item.id}>
                        <Card key={item.id} title="" item={item as Products} />
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
