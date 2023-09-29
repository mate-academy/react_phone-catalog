import { useMemo } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { useGetProductsQuery } from '../../features/API/apiSlice';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';

export const HomePage = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();

  const hotPriceProducts = useMemo(() => {
    return products
      .filter(product => product.discount !== 0)
      .sort((a, b) => calculateDiscount(a) - calculateDiscount(b));
  }, [products]);

  return (
    <div className="HomePage container">
      {isLoading && (
        <div className="HomePage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <>
          <h1 className="HomePage__carousel-container">
            Home page
          </h1>

          <section className="section">
            <h2 className="section__title">
              Hot prices
            </h2>

            <ProductSlider
              products={hotPriceProducts}
            />
          </section>
        </>
      )}
    </div>
  );
};
