/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { Product, productDescription } from '../types';
import '../styles/blocks/ProductPage.scss';
import { detailsURL, getProducts } from '../api/products';
import { ProductDescription }
  from '../components/ProductDescription/ProductDescription';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';
import { Cart } from '../types/cart';

type Props = {
  updatePageHeight: () => void;
  isLoading: boolean;
  products: Product[];
  setIsLoading: (value: boolean) => void;
  handleSetCarts: (value:Product) => void;
  carts:Cart[];
  handleSetFavorites: (value:Product) => void;
  favorites: Product[];
};

function shuffleArray(array: Product[]) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export const ProductPage: React.FC<Props> = ({
  updatePageHeight,
  isLoading,
  products,
  setIsLoading,
  handleSetCarts,
  carts,
  handleSetFavorites,
  favorites,
}) => {
  const [productDetails, setProductDetail]
  = useState<productDescription | undefined>(undefined);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => updatePageHeight(), []);

  let productType: string | undefined;
  const location = useLocation();
  const productID = location.pathname.split('/')[2];

  useEffect(() => {
    setProduct(products.find((oneProduct) => oneProduct.id === productID));
  }, [products, location]);

  const randomProducts = useMemo(() => {
    return shuffleArray(products);
  }, [product]);

  useEffect(() => {
    async function fetchProducts() {
      if (product !== undefined) {
        setIsLoading(true);
        try {
          const data = await getProducts(`${detailsURL}${product.id}.json`);

          setProductDetail(data);
        } catch (error) {
          throw new Error('Error downloading data');
        }

        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [product]);

  if (product !== undefined) {
    switch (product.type) {
      case 'phone':
        productType = 'Phones';
        break;
      case 'tablet':
        productType = 'Tablets';
        break;
      case 'accessory':
        productType = 'Accessories';
        break;
      default:
    }
  }

  return (
    <div className="product-page-container">
      {isLoading ? (
        <Loader />
      ) : product === undefined ? (
        <h1 className="title phones-page-container__title">
          Product was not found
        </h1>
      ) : (
        <>
          <div className="icon-navigation
          phones-page-container__icon-navigation"
          >
            <Link to="/">
              <img src="./img/icons/home.svg" alt="#logo" />
            </Link>
            <img src="./img/icons/arrowright.svg" alt="#logo" />
            <Link
              to={productType ? `/${productType.toLocaleLowerCase()}` : '/'}
              className="icon-navigation-text
              icon-navigation-text--dark"
            >
              {productType}
            </Link>
            <img src="./img/icons/arrowright.svg" alt="#logo" />
            <span className="icon-navigation-text">{product.name}</span>
          </div>

          <button
            type="button"
            className="back-button product-page-container__back-button"
            onClick={() => window.history.back()}
            data-cy="backButton"
          >
            <img
              src="./img/icons/arrowleft.svg"
              alt="#back"
              className="img"
            />
            <span className="icon-navigation-text">Back</span>
          </button>
        </>
      )}
      {productDetails !== undefined && (
        <ProductDescription
          productDetails={productDetails}
          product={product}
          handleSetCarts={handleSetCarts}
          carts={carts}
          handleSetFavorites={handleSetFavorites}
          favorites={favorites}
        />
      )}
      <div className="product-page-container__slider">
        <ProductSlider
          products={randomProducts.slice(0, 10)}
          title="You may also like"
          handleSetCarts={handleSetCarts}
          carts={carts}
          handleSetFavorites={handleSetFavorites}
          favorites={favorites}
        />
      </div>
    </div>
  );
};
