import {
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../helpers/utils/API';
import { Product } from '../../helpers/types/Product';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
import { Category } from '../../Components/Category/Category';
import { SliderGallery } from '../../Components/SliderGallery/SliderGallery';
import { Loader } from '../../Components/Loader/Loader';
import { Notification } from '../../Components/Notification/Notification';
/* eslint-disable-next-line */
import { getLinkForProductCard } from '../../helpers/utils/getLinkForProductCard';
/* eslint-disable-next-line */
import { ProductCardInfo } from '../../Components/ProductCardInfo/ProductCardInfo';

type Props = {
  favoriteProducts: Product[],
  setFavorite: (item: Product) => void,
  selectedProducts: Product[],
  setSelectedProducts: (item: Product) => void,
};

export const HomePage: FC<Props> = ({
  selectedProducts,
  setSelectedProducts,
  favoriteProducts,
  setFavorite,
}) => {
  const [products, setProduct] = useState<Product[]>([]);
  const [isLoadProducts, setIsLoadProducts] = useState(false);
  const [isError, setIsError] = useState(false);

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
      setIsError(false);
      const productsFromAPI = await getProducts();

      setProduct(productsFromAPI);
    } catch {
      setIsError(true);
    } finally {
      setIsLoadProducts(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isError) {
    return <Notification message="Can`t load products" />;
  }

  if (isLoadProducts) {
    return <Loader />;
  }

  return (
    <div className="homePage">
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
            <Link
              to={`/${getLinkForProductCard(product.type)}/${product.id}`}
              className="productCard"
              key={product.id}
              data-cy="cardsContainer"
            >
              <ProductCardInfo
                setSelectedProducts={setSelectedProducts}
                selectedProducts={selectedProducts}
                favoriteProducts={favoriteProducts}
                setFavorite={setFavorite}
                product={product}
              />
            </Link>
          ))}
        </ProductsSlider>
      </section>
      <section className="homePage__section">
        <Category />
      </section>
      <section className="homePage__section">
        <ProductsSlider title="Brand new models">
          {getBrandNewProducts.map(product => (
            <Link
              to={`/${getLinkForProductCard(product.type)}/${product.id}`}
              className="productCard"
              key={product.id}
              data-cy="cardsContainer"
            >
              <ProductCardInfo
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                favoriteProducts={favoriteProducts}
                setFavorite={setFavorite}
                product={product}
              />
            </Link>
          ))}
        </ProductsSlider>
      </section>
    </div>
  );
};
