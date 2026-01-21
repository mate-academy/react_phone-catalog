import { useLocation, useParams } from 'react-router-dom';
import { Back } from '../../elements/Back';
import { useGoods } from './useGoods';
import { getGoodSourceByRoute } from '../../services/product';
import { Plug } from '../../components/Plug';
import { useTranslation } from 'react-i18next';
import { GoodLayout } from '../../components/GoodLayout';
import { getSpecsByGood } from '../../services/good';
import styles from './GoodPage.module.scss';
import { Loader } from '../../elements/Loader';
import { useMathingProduct } from './useMathingProducts';
import { ProductSwiper } from '../../components/ProductSwiper';
import { useEffect } from 'react';
import { scrollTop } from '../../services/layouts';

export const GoodPage = () => {
  const { t } = useTranslation();
  const { id = '' } = useParams();
  const { pathname } = useLocation();

  const source = getGoodSourceByRoute(pathname);

  const { goods, isLoading, error } = useGoods({
    id,
    source,
  });

  const selectedGood = goods.find(good => good.id === id);
  // const selectedGood = undefined;

  const {
    products,
    isLoading: isMatchingLoading,
    error: mathingError,
  } = useMathingProduct(selectedGood || null);

  const isPlugVisible = !isLoading && !selectedGood && !error;
  const isLayoutVisible = !isLoading && selectedGood && !error;

  useEffect(() => {
    scrollTop();
  }, [id]);

  return (
    <section className={styles.goodPage}>
      <Back />
      {error && (
        <div className={styles.goodPage__plug}>
          <Plug label={t(error)} />
        </div>
      )}
      {isPlugVisible && (
        <div className={styles.goodPage__plug}>
          <Plug label={t('productNotFound')} />
        </div>
      )}
      {isLoading && (
        <div className={styles.goodPage__plug}>
          <Loader />
        </div>
      )}

      {isLayoutVisible && (
        <>
          <GoodLayout
            itemId={selectedGood.id}
            category={selectedGood.category}
            title={selectedGood.name}
            images={selectedGood.images}
            priceRegular={selectedGood.priceRegular}
            priceDiscount={selectedGood.priceDiscount}
            description={selectedGood.description}
            colorsAvailable={selectedGood.colorsAvailable}
            capacityAvailable={selectedGood.capacityAvailable}
            color={selectedGood.color}
            capacity={selectedGood.capacity}
            fastSpecs={getSpecsByGood(selectedGood, true)}
            specs={getSpecsByGood(selectedGood, false)}
            goods={goods}
          />
          {!mathingError && (
            <ProductSwiper
              items={products}
              isLoading={isMatchingLoading}
              title={t('You may also like')}
            />
          )}
        </>
      )}
    </section>
  );
};
