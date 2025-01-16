import { useTranslation } from 'react-i18next';
import { Carousel } from '../../components/Carousel';
import { Categories } from '../../components/Categories';
import { Loader } from '../../components/Loader';
import { Slider } from '../../components/Slider';
import { setProds } from '../../features/prods';
import { useAppDispath, useAppSelector } from '../../hooks/hooks';
import { getNewProducts } from '../../services/getNewProducts';
import './HomePage.scss';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [isloading, setIsLoading] = useState(false);
  const discount = true;

  const { t } = useTranslation();

  const dispatch = useAppDispath();

  const { prods } = useAppSelector(state => state.prods);

  useEffect(() => {
    setIsLoading(true);

    getNewProducts()
      .then(resolve => {
        dispatch(setProds(resolve));
      })
      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const discountProducts = [...prods]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .filter(prod => prod.fullPrice - prod.price > 80);

  const newProducts = [...prods]
    .filter(prod => prod.year === 2022)
    .sort((prod1, prod2) => prod1.year - prod2.year);

  return (
    <div className="homePage">
      <div className="homePage__title">
        <h2 className="homePage__title--text">{t('homePage.title')}</h2>
      </div>

      <section className="Carousel">
        <Carousel />
      </section>

      {isloading ? (
        <Loader />
      ) : (
        <>
          <section className="newModels">
            <Slider products={newProducts} title={t('homePage.newModel')} />
          </section>

          <section className="categories">
            <Categories />
          </section>

          <section className="hotPrices">
            <Slider
              products={discountProducts}
              discount={discount}
              title={t('homePage.hotPrices')}
            />
          </section>
        </>
      )}
    </div>
  );
};
