import { useContext, useEffect, useState } from 'react';
import { getHotPriceProducts } from 'src/api/getHotPriceProducts';
import { Product } from 'src/types/Product';
import { getNewModels } from 'src/api/getNewModels';
import { SliderSection } from 'src/pages/HomePage/sections/SliderSection';
import { ProductContext } from 'src/contexts/ProductContext';
import { SliderComponent } from './sections/sliderComponent/SliderComponent';
import { ShopByCategory } from './sections/ShopByCategory/ShopByCategory';

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
                <SliderSection
                  sectionTitle="Hot prices"
                  renderedProducts={hotPriceProducts}
                />
              )}

        <ShopByCategory products={products} />

        {!!newModels.length && (
          <SliderSection
            sectionTitle="Brand new models"
            renderedProducts={newModels}
          />
        )}
      </div>
    </>
  );
};
