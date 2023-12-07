/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useEffect,
  CSSProperties,
  useState,
} from 'react';
import RotateLoader from 'react-spinners/ClipLoader';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Category } from '../../components/Category/Category';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import {
  client,
  getHotPriceProducts,
  getNewProducts,
} from '../../helpers/utils/fetchData';

enum Categories {
  Phones = 'phones',
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  padding: '100 100',
};

export const HomePage: React.FC = () => {
  const {
    hotPricePhones,
    setHotPriceProducts,
    newPhones,
    setNewProducts,
    // cardsHeight,
  } = useProducts();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchPhones();

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
        <div className="loader">
          <RotateLoader
            color="#313237"
            cssOverride={override}
            size={200}
          />
        </div>
      ) : (
        <ProductCard
          discount
          title="Hot prices"
          products={hotPricePhones}
        />
      )}

      <Category />
      {isLoading ? (
        <div className="loader">
          <RotateLoader
            color="#313237"
            cssOverride={override}
            size={200}
          />
        </div>
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
