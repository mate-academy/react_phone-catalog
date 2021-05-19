import React from 'react';
import './Main.scss';
import { ImageSlider } from '../ImageSlider/ImageSlider';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const Main = () => {
  return (
    <main className="Page-Main">
      <ImageSlider />
      <ProductsSlider sliderType="Hot Prices" />
      <ShopByCategory />
      <ProductsSlider sliderType="Brand New Models" />
    </main>
  );
};

// TO PASS PROMISE IN COMPONENT

// import React from 'react';
// import './Main.scss';
// import { ImageSlider } from '../ImageSlider/ImageSlider';
// import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
// import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
// import { getHotPriceProducts, getBrandNewProducts } from '../../../../api/getSliderProducts';

// export const Main = () => {
//   return (
//     <main className="Page-Main">
//       <ImageSlider />
//       <ProductsSlider getProducts={getHotPriceProducts} />
//       <ShopByCategory />
//       <ProductsSlider getProducts={getBrandNewProducts} />
//     </main>
//   );
// };
