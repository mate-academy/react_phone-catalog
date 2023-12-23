/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useEffect,
  useState,
} from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Category } from '../../components/Category/Category';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import {
  client,
  getHotPriceProducts,
  getNewProducts,
} from '../../helpers/utils/fetchData';
import { Loader } from '../../components/Loader/Loader';
import { Categories } from '../../Types/Categories';

export const HomePage: React.FC = () => {
  const {
    hotPricePhones,
    setHotPriceProducts,
    newPhones,
    setNewProducts,
  } = useProducts();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchProducts();

        const mappedData = data.map((phone) => {
          return { ...phone, name: `${phone.name} (iMT9G2FS/A)` };
        });

        setHotPriceProducts(getHotPriceProducts(mappedData, Categories.Phones));
        setNewProducts(getNewProducts(mappedData, Categories.Phones));
        setIsLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setHotPriceProducts, setNewProducts]);

  return (
    <>
      <ProductSlider />
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          discount
          title="Hot prices"
          products={hotPricePhones}
        />
      )}

      <Category />
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          discount={false}
          title="Brand new models"
          products={newPhones}
        />
      )}
    </>
  );
};
