import { useLanguage } from '../../context/LanguageContext';

import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

import './Home.scss';

export const Home = () => {
  const { t } = useLanguage();

  return (
    <section className="home">
      <div className="page-container">
        <h1
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >Product Catalog</h1>
        
        <p className="home__title" role="heading" aria-level={1}>
          {t('welcomeTitle')}
        </p>

        <PicturesSlider />

        <ProductsSlider
          title={t('hotPrices')}
          type="hot"
        />

        <ShopByCategory />

        <ProductsSlider
          title={t('newestProducts')}
          type="newest"
        />
      </div>
    </section>
  );
};