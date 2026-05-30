import { Slider } from '../Slider/Slider';
import { BrandNewModels } from '../BrandNewModels/BrandNewModels';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { Product } from '../../types';
import { HotPrices } from '../HotPrices/HotPrices';
import './HomePage.scss';
import React from 'react';

// Видалив імпорт { H } та { Header }, { Footer },
// якщо ти їх не використовуєш прямо тут (Header зазвичай в App.tsx)

type HomePageProps = {
  favourites: Product[];
  addToFav?: (product: Product) => void;
};

export const HomePage: React.FC<HomePageProps> = ({ favourites, addToFav }) => {
  return (
    <div className="home-page">
      {/* Додав клас container, про який ми говорили раніше */}

      <Slider />

      <BrandNewModels favourites={favourites} addToFav={addToFav} />

      <ShopByCategory />

      <HotPrices favourites={favourites} addToFav={addToFav} />
    </div>
  );
};
