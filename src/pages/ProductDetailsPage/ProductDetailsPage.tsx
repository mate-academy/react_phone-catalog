import {
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Path } from '../../components/Path';
import './ProductDetailsPage.scss';
import { Category, Product, ProductDetails } from '../../types';
import { getProductDetails, getProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton';
import { ProductInfo } from '../../components/ProductInfo';
import { ProductsSlider } from '../../components/ProductsSlider';
import { NoProducts } from '../../components/NoProducts';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { name } = product || {};

  const { itemId } = useParams();
  const { pathname } = useLocation();
  const category = pathname.slice(1).split('/')[0] as Category;

  useEffect(() => {
    setIsLoading(true);

    if (itemId) {
      Promise.all([getProducts(), getProductDetails(category, itemId)])
        .then(([productsResponse, productResponse]) => {
          if (productsResponse && productResponse) {
            setProducts(productsResponse
              .filter(item => item.category === category));
            setProduct(productResponse);
          } else {
            setIsError(true);
          }
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [category, itemId]);

  const selectedProduct = products.find(item => item.itemId === product?.id);

  const getSuggestedProducts = () => {
    const randomProducts = [];
    const items = [...products];

    while (items.length > 0) {
      const index = Math.floor(Math.random() * items.length);

      const item = items.splice(index, 1)[0];

      randomProducts.push(item);
    }

    return randomProducts;
  };

  const suggestedProducts = getSuggestedProducts();

  if (isError && !isLoading) {
    return (
      <div className="product-details-page">
        <div className="product-details-page__content">
          <NoProducts title="Product was not found" />
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-page__content">
        <Path name={name} />

        <div className="product-details-page__back">
          <BackButton />
        </div>

        <h2 className="product-details-page__title">
          {name}
        </h2>

        {isLoading && (
          <Loader />
        )}

        {product && !isLoading && !isError && (
          <>
            <section className="product-details-page__section">
              <ProductInfo productInfo={product} product={selectedProduct} />
            </section>

            <section className="product-details-page__section">
              <ProductsSlider
                products={suggestedProducts.slice(0, 30)}
                title="You may also like"
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
};
