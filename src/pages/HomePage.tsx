/* eslint-disable operator-linebreak */
import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { Banner } from '../components/Banner';
import { ProductsSlider } from '../components/ProductsSlider';
import { Categories } from '../components/Categories';

export const HomePage = () => {
  const {
    products,
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Home Page');
    setIsHeaderSearchVisible(false);
    setIsMenuOpen(false);
  }, []);

  const getHotPriceProducts = useMemo(() => {
    return products.sort((a, b) => {
      return b.fullPrice - b.price - (a.fullPrice - a.price);
    });
  }, [products]);

  const getBrandNewProducts = useMemo(() => {
    return products
      .filter(({ fullPrice, price }) => fullPrice - price <= 40)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <>
      <Banner />
      <ProductsSlider title="Hot prices" items={getHotPriceProducts} />
      <Categories />
      <ProductsSlider title="Brand new models" items={getBrandNewProducts} />
    </>
  );
};
