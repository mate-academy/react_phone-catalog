import { useContext, useMemo } from 'react';
import './style.scss';
import { Banner } from '../../components/Banner/Banner';
import { PhonesContext } from '../../store/PhonesContext';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { CategoryShop } from '../../components/CategoryShop/CategoryShop';
import { Titles } from '../../types/Titles';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const HomePage = () => {
  const { phones, loading, isError } = useContext(PhonesContext);
  const hotPricePhones = useMemo(() => {
    return phones.filter(({ price, fullPrice }) => fullPrice - price >= 80);
  }, [phones]);

  const brandNewPhones = useMemo(() => {
    return [...phones]
      .filter(({ year }) => year >= 2019)
      .sort(() => Math.random() - 0.5);
  }, [phones]);

  return (
    <section className="home-page">
      <div className="home-page__banner">
        <Banner />
      </div>
      {loading && <Loader />}
      {!loading && isError && <ErrorMessage />}
      {!loading && !isError && (
        <>
          <div className="home-page__slider">
            <ProductSlider
              title={Titles.HOT}
              products={hotPricePhones}
              isOnSale
            />
          </div>
          <div className="home-page__categories">
            <CategoryShop phonesLengt={phones.length} />
          </div>
          <div className="home-page__slider">
            <ProductSlider
              title={Titles.NEW}
              products={brandNewPhones}
              isOnSale={false}
            />
          </div>
        </>
      )}
    </section>
  );
};
