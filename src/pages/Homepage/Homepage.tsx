import './Homepage.scss';
import { useContext, useMemo } from 'react';
import { Product } from '../../types/Product';

import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSwiper } from '../../components/ProductsSwiper/ProductsSwiper';
import { GlobalContext } from '../../context/GlobalContext';
import { ShopByCategory } from '../../components/ShopByCategory';
import { ProductName } from '../../types/prodName';
import { ErrorBlock } from '../../components/ErrorBlock';

const getLatestProducts = (products: Product[], name: ProductName): Product[] => {
  return products
    .filter(product => product.category === name)
    .map(product => ({
      ...product,
      category: name,
    }))
    .sort((p1, p2) => p2.price - p1.price)
    .slice(0, 7);
};

export const Homepage = () => {
  const { allProducts, reloadProducts } = useContext(GlobalContext);

  // const getLatestProducts = (name: ProductName): Product[] => {
  //   return allProducts
  //     .filter(product => product.category === name)
  //     .map(product => ({
  //       ...product,
  //       category: name,
  //     }))
  //     .sort((p1, p2) => p2.price - p1.price)
  //     .slice(0, 7);
  // };

  const newPhones = useMemo(() => {
    return getLatestProducts(allProducts, 'phones' as ProductName);
  }, [allProducts]);
  const newTablets = useMemo(() => {
    return getLatestProducts(allProducts, 'tablets' as ProductName);
  }, [allProducts]);
  const newAccessories = useMemo(() => {
    return getLatestProducts(allProducts, 'accessories' as ProductName);
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
        {allProducts.length !== 0 ? (
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
                  discount={true}
                  title={'Hot prices'}
                />
              )}
            </div>
          </div>
        ) : (
          <ErrorBlock
            message="Products are not available"
            onReload={reloadProducts}
          />
        )}
      </div>
    </div>
  );
};
