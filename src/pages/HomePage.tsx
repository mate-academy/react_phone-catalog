import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../helpers/api';
import { Loader } from '../components/additional/Loader';
import { Carousel } from '../components/Carousel/Carousel';
import { Category } from '../components/Category/Category';
import { Slider } from '../components/Products/ProductsSlider';
import { Product } from '../types/Product';
import { NoResults } from '../components/additional/NoResults';
import { Errors } from '../types/Errors';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadProducts = useCallback(async () => {
    setIsLoad(true);

    try {
      const allProducts = await getProducts();

      setProducts(allProducts);
      setDiscountProducts(allProducts.filter(product => product.discount > 0));
      setNewProducts(allProducts.filter(product => product.discount === 0));
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="main">
      <Carousel />

      {isLoad && (<Loader />)}

      {!isLoad && !isError && (
        <>
          <Slider
            products={discountProducts}
            title="Hot prices"
          />
          {discountProducts.length === 0 && (
            <NoResults text="No Products with discount" isShowButton={false} />
          )}
        </>
      )}
      {isError && (<NoResults text={Errors.FETCH} isShowButton={false} />)}

      <Category products={products} />

      {isLoad && (<Loader />)}

      {!isLoad && !isError && (
        <>
          <Slider
            products={newProducts}
            title="Brand new models"
          />
          {newProducts.length === 0 && (
            <NoResults text="No new models" isShowButton={false} />
          )}
        </>
      )}

      {isError && (<NoResults text={Errors.FETCH} isShowButton={false} />)}

    </main>
  );
};
