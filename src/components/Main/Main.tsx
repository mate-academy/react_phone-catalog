import style from '../Main/Main.module.scss';
import { useContext } from 'react';
import { Slider } from './Slider/Slider';
import { LanguageContext } from '../../store/LanguageProvider';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { BrandNewModels } from './BrandNewModels/BrandNewModels';
import { HotPrices } from './HotPrices/HotPrices';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

enum Pathname {
  phones = '/phones',
  tablets = '/tabets',
  accessories = '/accessories',
}

export const Main = () => {
  const { t } = useContext(LanguageContext);
  const activeScroll = () => (document.body.style.overflowY = 'auto');
  const { pathname } = useLocation();

  const homePage =
    pathname !== Pathname.phones &&
    pathname !== Pathname.tablets &&
    pathname !== Pathname.accessories;

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
