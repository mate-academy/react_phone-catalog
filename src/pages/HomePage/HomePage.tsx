import { useContext, useEffect } from 'react';
import { Banner } from '../../components/Banner';
import { Context } from '../../components/Context';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';

export const HomePage: React.FC = () => {
  const { isLoading } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading
        && <Loader />}

      {!isLoading && (
        <>
          <Banner />

          <ProductsSlider
            type="hot-prices"
          />

          <ShopByCategory />

          <ProductsSlider
            type="new-models"
          />
        </>
      )}
    </>
  );
};
