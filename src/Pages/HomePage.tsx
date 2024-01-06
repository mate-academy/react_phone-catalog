import React, { useEffect, useState } from 'react';
import { PicturesSlider } from '../components/PictureSlider/PicturesSlider';
import { Category } from '../components/Category/Category';
import { ProductType } from '../helpers/types/ProductType';
import {
  getHotPriceProducts,
  getNewModelsProducts,
} from '../api/api';
import './Page.scss';
import { ProductCard } from '../components/ProductCard/ProductCard';
import {
  ProductSlider,
  Slide,
} from '../components/ProductSlider/ProductSlider';
import { categoryImages } from '../helpers/utils/constants';

export const HomePage: React.FC = () => {
  const [hotProducts, setHotProducts] = useState<ProductType[]>([]);
  const [newProducts, setNewProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    Promise.all([
      getHotPriceProducts()
        .then(setHotProducts),

      getNewModelsProducts()
        .then(setNewProducts),
    ]);
  }, []);

  return (
    <main className="page">
      <section className="page__section">
        <PicturesSlider />
      </section>

      <section className="page__section">

        <ProductSlider title="Hot prices">
          {hotProducts.map(prod => (
            <Slide key={prod.id}>
              <ProductCard product={prod} />
            </Slide>
          ))}
        </ProductSlider>
      </section>

      <section className="page__sections">
        <h2 className="page__title-h2">Shop by category</h2>
        <div className="page__categiries">
          {categoryImages.map(image => (
            <Category key={image} image={image} />
          ))}
        </div>
      </section>

      <section className="page__section">
        <div>
          <ProductSlider title="Brand new models">
            {newProducts.map(prod => (
              <Slide key={prod.id}>
                <ProductCard product={prod} />
              </Slide>
            ))}
          </ProductSlider>
        </div>
      </section>
    </main>
  );
};
