import { useMemo, useState } from 'react';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { PicturesSlider } from '../../components/PicturesSlider';
import { useProducts } from '../../hooks/useProducts';
import { useTranslate } from '../../hooks/useTranslate';
import { prepareFilteredProducts } from '../../utils/prepareFilteredProducts';
import { IMAGES_FOR_PICTURES_SLIDER } from '../../constants/picturesSlider';
import '../../App.scss';
import style from './HomePage.module.scss';
import cn from 'classnames';

export const HomePage = () => {
  const [currentPicture, setCurrentPicture] = useState(0);
  const { productsList: products, isLoading } = useProducts();
  const t = useTranslate();

  const { newProducts, discountProducts } = useMemo(
    () => prepareFilteredProducts(products),
    [products],
  );

  return (
    <div className="homeContent">
      <h1 className="visuallyHidden">Product Catalog</h1>
      <p className="pageTitle">{t('homePage.title')}</p>
      <section
        className={cn(style.picturesSliderSection, style.fullWidthMobile)}
      >
        <PicturesSlider
          data={IMAGES_FOR_PICTURES_SLIDER}
          currentSlide={currentPicture}
          onSlideChange={setCurrentPicture}
        />
      </section>

      <section className={style.homeSection}>
        <ProductsSlider
          title={t('homePage.newModels')}
          titleClassName="sectionTitle"
          data={newProducts}
          isLoading={isLoading}
          hasDiscount={false}
        />
      </section>

      <section className={cn(style.homeSection, style.byCategoryContent)}>
        <h2 className="sectionTitle">{t('homePage.category')}</h2>
        <ShopByCategory />
      </section>

      <section className={style.homeSection}>
        <ProductsSlider
          title={t('homePage.hotPrices')}
          titleClassName="sectionTitle"
          data={discountProducts}
          isLoading={isLoading}
          hasDiscount={true}
        />
      </section>
    </div>
  );
};
