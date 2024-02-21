import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { PictureSlider } from '../../components/PictureSlider/PictureSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { banners } from '../../helpers/banners';
import { BASE_URL } from '../../helpers/constants';
import { sortProducts } from '../../helpers/sortProducts';
import { Product } from '../../types/Product';
import { SortType } from '../../types/SortType';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const data = useLoaderData() as Product[];
  const sortedByDiscount = sortProducts([...data], SortType.Discount);

  const sortedByYear = sortProducts([...data], SortType.Newest);

  return (
    <div className="home-page">
      <div
        className="home-page__section"
      >
        <PictureSlider
          slides={banners}
        />
      </div>

      <div className="home-page__section">
        <ProductsSlider
          title="Hot prices"
          products={sortedByDiscount}
        />
      </div>

      <div className="home-page__section">
        <ShopByCategory />
      </div>

      <div className="home-page__section">
        <ProductsSlider
          title="Brand new models"
          products={sortedByYear}
        />
      </div>
    </div>
  );
};

export async function loader() {
  const response = await fetch(`${BASE_URL}${'products.json'}`);

  if (!response.ok) {
    throw new Error('Could not fetch data.');
  }

  const resData = response.json();

  return resData;
}
