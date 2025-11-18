import './Homepage.scss';
import { useContext, useMemo } from 'react';
import { Product } from '../../types/Product';

import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSwiper } from '../../components/ProductsSwiper/ProductsSwiper';
import { GlobalContext } from '../../context/GlobalContext';
import { ShopByCategory } from '../../components/ShopByCategory';

export const Homepage = () => {
  const { allProducts } = useContext(GlobalContext);

  const getLatestProducts = (
    name: 'phones' | 'accessories' | 'tablets',
  ): Product[] => {
    return allProducts
      .filter(product => product.category === name)
      .map(product => ({
        ...product,
        category: name,
      }))
      .sort((p1, p2) => p2.price - p1.price)
      .slice(0, 7);
  };

  const newPhones = useMemo(() => {
    return getLatestProducts('phones');
  }, [allProducts]);
  const newTablets = useMemo(() => {
    return getLatestProducts('tablets');
  }, [allProducts]);
  const newAccessories = useMemo(() => {
    return getLatestProducts('accessories');
  }, [allProducts]);

  const latestProducts = [
    ...newPhones.slice(0, 3),
    ...newTablets.slice(0, 3),
    ...newAccessories.slice(0, 3),
  ];
  const newProducts = [...newPhones, ...newTablets, ...newAccessories];
  const hotPriceProducts = [...allProducts]
    .sort((a, b) => {
      const discount1 = a.fullPrice - a.price;
      const discount2 = b.fullPrice - b.price;

      return discount2 - discount1;
    })
    .slice(0, 20);

  return (
    <div className="page">
      <div className="container">
        <div className="page__content">
          <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
          <div className="page__sections">
            {latestProducts.length && (
              <PicturesSlider latestProducts={latestProducts} />
            )}

            {newProducts && (
              <ProductsSwiper
                products={newProducts}
                title={'Brand new models'}
              />
            )}

            <ShopByCategory />

            {hotPriceProducts && (
              <ProductsSwiper
                products={hotPriceProducts}
                swiperId="hot"
                title={'Hot prices'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
