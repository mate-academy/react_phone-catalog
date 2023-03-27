import { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../../utils/API';
import { Error } from '../../types/Error';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { Category } from '../../Components/Category/Category';
import { SliderGallery } from '../../Components/SliderGallery/SliderGallery';
import './homePage.scss';

export const HomePage = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [isLoadProducts, setIsLoadProducts] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: Error.NONE,
  });

  const hotPriceProducts = useMemo(() => {
    return products
      .filter(({ discount }) => !!discount)
      .sort((prodPrev, prodCurr) => prodCurr.discount - prodPrev.discount);
  }, [products]);

  const getBrandNewProducts = useMemo(() => {
    return products
      .filter(({ discount }) => !discount)
      .sort((prodPrev, prodCurr) => prodCurr.price - prodPrev.price);
  }, [products]);

  const fetchProduct = async () => {
    try {
      setIsLoadProducts(true);
      setError({
        error: false,
        message: Error.NONE,
      });
      const productsFromAPI = await getProducts();

      setProduct(productsFromAPI);
    } catch {
      setError({
        error: true,
        message: Error.LOAD,
      });
    } finally {
      setIsLoadProducts(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="homePage">
      {isLoadProducts && <>load</>}
      {error.error && <>{error.message}</>}
      <section className="homePage__section">
        <SliderGallery>
          <span id="1" className="slider__image slider__image--1" />
          <span id="2" className="slider__image slider__image--2" />
          <span id="3" className="slider__image slider__image--3" />
          <span id="4" className="slider__image slider__image--4" />
        </SliderGallery>
      </section>

      <section className="homePage__section">
        <ProductsSlider title="Hot prices">
          {hotPriceProducts.map(product => (
            <div
              className="productCard"
              key={product.id}
              data-cy="cardsContainer"
            >
              <ProductCard product={product} isDiscount />
            </div>
          ))}
        </ProductsSlider>
      </section>
      <section className="homePage__section">
        <Category />
      </section>
      <section className="homePage__section">
        <ProductsSlider title="Brand new models">
          {getBrandNewProducts.map(product => (
            <div
              className="productCard"
              key={product.id}
              data-cy="cardsContainer"
            >
              <ProductCard product={product} isDiscount={false} />
            </div>
          ))}
        </ProductsSlider>
      </section>
    </div>
  );
};
