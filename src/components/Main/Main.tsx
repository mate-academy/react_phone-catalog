import style from '../Main/Main.module.scss';
import { useContext } from 'react';
import { Slider } from './Slider/Slider';
import { LanguageContext } from '../../store/LanguageProvider';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { BrandNewModels } from './BrandNewModels/BrandNewModels';
import { HotPrices } from './HotPrices/HotPrices';
import { useLocation, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Pathname } from '../../enums/Pathname';

export const Main = () => {
  const { t } = useContext(LanguageContext);
  const activeScroll = () => (document.body.style.overflowY = 'auto');
  const { pathname } = useLocation();
  const { productId } = useParams();

  const productIdChech = productId ? productId : '';

  const homePage =
    (pathname !== Pathname.phones || productIdChech.length > 0) &&
    pathname !== Pathname.tablets &&
    pathname !== Pathname.favorites &&
    pathname !== Pathname.accessories &&
    !productIdChech;

  return (
    <main
      className={style.main}
      onWheel={activeScroll}
      onTouchStart={activeScroll}
    >
      {homePage && (
        <div className={style.main__content}>
          <h1 className={style.main__title}>{t('welcome')}</h1>

          <section className={style.main__heroSlider}>
            <Slider />
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
