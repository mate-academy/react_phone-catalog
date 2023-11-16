import { Banner } from '../../comonents/Banner';
import { BrandNew } from '../../comonents/BrandNew';
import { Category } from '../../comonents/Category';
import { HotPrices } from '../../comonents/HotPrices';
import { Loader } from '../../comonents/Loader';
import { useProducts } from '../../comonents/ProductContext';

import './HomePage.scss';

export const HomePage = () => {
  const { isLoading, isError } = useProducts();

  return (
    <div className="home-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <h1>{isError}</h1>
          ) : (
            <>
              <section className="home-page__banner banner">
                <Banner />
              </section>

              <section className="home-page__hot-price">
                <HotPrices />
              </section>

              <section className="home-page__category category">
                <Category />
              </section>

              <section className="home-page__brand-new">
                <BrandNew />
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
};
