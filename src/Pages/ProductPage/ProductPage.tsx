import { useEffect, useState } from 'react';
import { Map } from '../../Components/Map';
import { ProductDetails } from '../../Types/ProductDetails';
import { Product } from '../../Types/Product';
import { useLocation, useParams } from 'react-router-dom';
import { Category } from '../../Types/Category';
import { getProductDetails, getProducts } from '../../api/apiProducts';
import { Loader } from '../../Components/Loader';
import { ProductsList } from '../../Components/ProductsList';
import './ProductPage.scss';
import { BackLink } from '../../Components/BackLink';
import { ProductInfo } from '../../Components/ProductInfo';

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { name } = product || {};

  const { productID } = useParams();
  const { pathname } = useLocation();
  const category = pathname.slice(1).split('/')[0] as Category;

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

  useEffect(() => {
    setIsLoading(true);

    if (productID) {
      Promise.all([getProducts(), getProductDetails(category, productID)])
        .then(([productsResponse, productResponse]) => {
          if (productsResponse && productResponse) {
            setProducts(
              productsResponse.filter(item => item.category === category),
            );

            setProduct(productResponse);
          } else {
            setIsError(true);
          }
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [category, productID]);

  return (
    <div className="product-page">
      <div className="container">
        <Map name={name} />

        <BackLink />

        {isLoading && <Loader />}

        {product && !isLoading && !isError && (
          <>
            <section className="product-page__section-details">
              <ProductInfo product={selectedProduct} productInfo={product} />
            </section>

            <section className="product-page__section">
              <ProductsList
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
