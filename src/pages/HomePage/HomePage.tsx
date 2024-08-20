/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import PicturesSlider from '../../components/PicturesSlider/PicturesSlider';
import ProductsList from '../../components/ProductsList/ProductsList';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { Picture } from '../../types/Picture';
import { Product } from '../../types/Product';
import { getHotProduct, getNewProduct } from '../../helpers/helpers';
import Loader from '../../components/Loader/Loader';

const picture: Picture[] = [
  {
    id: 1,
    src: './img/banner-phones.png',
    title: 'phones',
  },
  {
    id: 2,
    src: './img/banner-tablets.png',
    title: 'tablets',
  },
  {
    id: 3,
    src: './img/banner-accessories.png',
    title: 'accessories',
  },
];

const HomePage: React.FC = () => {
  const [newProduct, setNewProduct] = useState<Product[]>([]);
  const [hotProduct, setHotProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getHotProduct()
      .then(setHotProduct)
      .catch(() => setIsLoading(true));
  }, []);

  useEffect(() => {
    getNewProduct()
      .then(setNewProduct)
      .catch(() => setIsLoading(true));
  }, []);

  return (
    <main className="main">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="main__title">Welcome to Nice Gadgets store!</h1>

            <PicturesSlider picture={picture} />

            <ProductSlider title={`Brand new models`} product={newProduct} />

            <ProductsList />

            <ProductSlider title={`Hot prices`} product={hotProduct} />
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
