import { useMemo, useContext } from 'react';

import { ProductsContext } from '../../ProductsContext';

import { Baner } from '../../components/Baner';
import { ReactSlider } from '../../components/ReactSlider';
import { Product } from '../../types/Product';
import { Category } from '../../components/Category';

export const HomePage: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const hotPrices = useMemo((): Product[] => {
    return products.filter(product => product.price)
      .map((product: Product) => ({
        ...product,
        newPrice: (
          (product.fullPrice - ((product.price * product.fullPrice) / 100))
            .toString()),
      }));
  }, [products]);

  const brandNewModels = useMemo((): Product[] => {
    return products.filter(product => product.price)
      .sort((a, b) => b.fullPrice - a.fullPrice);
  }, [products]);

  return (
    <>
      <div className="section">
        <div className="container">
          <Baner />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <ReactSlider products={hotPrices} title="Hot Prices" />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h1 className="title has-text-weight-bold px-3">Shop by category</h1>
          <Category />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <ReactSlider products={brandNewModels} title="Brand new models" />
        </div>
      </div>

    </>
  );
};
