import React from 'react';
import { Carousel } from '../../components/Carousel';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNewModels } from '../../components/BrandNewModels';

import '../../styles/blocks/page.scss';
import './HomePage.scss';

const images = require.context(
  '../../images/banners', true,
  /\.(png|ico|svg|jpg|gif)$/,
);
const imageList = images.keys().map(image => images(image));

// eslint-disable-next-line
// ([a-zA-z\.]+(?=$))

export const HomePage: React.FC = () => {
  return (
    <div className="HomePage HomePage__container page__container">
      <Carousel>
        {imageList.map((image) => (
          <div key={image} style={{ backgroundImage: `url(${image})` }} />
        ))}
      </Carousel>

      <HotPrices />

      <ShopByCategory />

      <BrandNewModels />
    </div>
  );
};
