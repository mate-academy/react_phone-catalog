import style from '../Main/Main.module.scss';
import { useContext, useEffect, useRef } from 'react';
import { HeroSlider } from './HeroSlider/HeroSlider';
import { LanguageContext } from '../../store/LanguageProvider';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { BrandNewModels } from './BrandNewModels/BrandNewModels';
import { HotPrices } from './HotPrices/HotPrices';
import { useLocation, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Pathname } from '../../enums/Pathname';
import { Skeleton } from '../Skeleton';
import { ProductsContext } from '../../store/ProductsProvider';
import { StateContext } from '../../store/StateProvider';

export const Main = () => {
  const { t } = useContext(LanguageContext);
  const activeScroll = () => (document.body.style.overflowY = 'auto');
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { isLoading } = useContext(ProductsContext);
  const productIdChech = productId ? productId : '';
  const element = useRef(null);
  const { handleResize } = useContext(StateContext);

  const homePage =
    (pathname !== Pathname.phones || productIdChech.length > 0) &&
    pathname !== Pathname.tablets &&
    pathname !== Pathname.favorites &&
    pathname !== Pathname.cart &&
    pathname !== Pathname.accessories &&
    !productIdChech;

  useEffect(() => {
    handleResize(element);
  }, [homePage, handleResize]);

  return (
    <main
      className={style.main}
      onWheel={activeScroll}
      onTouchStart={activeScroll}
      ref={element}
    >
      {homePage && (
        <div className={style.main__content}>
          <h1 className={style.main__title}>
            {!isLoading ? t('welcome') : <Skeleton height={48} />}
          </h1>

          <section className={style.main__heroSlider}>
            <HeroSlider />
          </section>

          <div className={style.main__container}>
            <BrandNewModels />
            <ShopByCategory />
            <HotPrices />
          </div>
        </div>
      )}
      <Outlet />
    </main>
  );
};
