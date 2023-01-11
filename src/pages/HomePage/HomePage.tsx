import { useContext, useEffect, useState } from 'react';
import { getHotPriceProducts } from 'src/api/getHotPriceProducts';
import { Product } from 'src/types/Product';
import { getNewModels } from 'src/api/getNewModels';
import { ProductContext } from 'src/contexts/ProductContext';
import { SliderComponent } from './sections/sliderComponent/SliderComponent';
import { ShopByCategory } from './sections/ShopByCategory/ShopByCategory';
import {
  SwiperSlider,
} from '../../features/SwiperSlider/SwiperSlider';

export const HomePage = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    setHotPriceProducts(getHotPriceProducts(products));
    setNewModels(getNewModels(products));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SliderComponent />

      <div className="container">
        {!!hotPriceProducts.length
              && (
                <SwiperSlider
                  sectionTitle="Hot prices"
                  renderedProducts={hotPriceProducts}
                />
              )}

        <ShopByCategory products={products} />

        {!!newModels.length && (
          <SwiperSlider
            sectionTitle="Brand new models"
            renderedProducts={newModels}
          />
        )}
      </div>
    </>
  );
};
