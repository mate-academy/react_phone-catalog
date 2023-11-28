/* eslint-disable operator-linebreak */
import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { Banner } from '../components/Banner';

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
    return products;
  }, [products]);

  const getBrandNewProducts = useMemo(() => {
    return products
      .filter(({ discount }) => discount === 0)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <>
      <Banner />

      {getHotPriceProducts.map((product) => (
        <h3 className="h3" key={product.id}>
          <p>{product.price}</p>
        </h3>
      ))}

      <br />

      {getBrandNewProducts.map((product) => (
        <h3 className="h3" key={product.id}>
          <p>{product.price}</p>
        </h3>
      ))}
    </>
  );
};
