import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Map } from '../../components/Map';
import './ProductPage.scss';
import { ProductDetails } from '../../types/productDetail';
import { Product } from '../../types/Product';
import { useLocation, useParams } from 'react-router-dom';
import { Category } from '../../types/Category';
import { getProduct } from '../../api/apiProducts';
import { getProductDetails } from '../../api/apiProducts';
import { ProductList } from '../../components/ProductList';
import { BackLink } from '../../components/BackLink';
import { ProductInfo } from '../../components/ProductInfo';

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

  const getSuggestedProduct = () => {
    const randomProducts = [];
    const items = [...products];

    while (items.length > 0) {
      const index = Math.floor(Math.random() * items.length);
      const item = items.splice(index, 1)[0];

      randomProducts.push(item);
    }

    return randomProducts;
  };

  const suggestedProducts = getSuggestedProduct();

  useEffect(() => {
    setIsLoading(true);

    if (productID) {
      Promise.all([getProduct(), getProductDetails(category, productID)])
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
              <ProductList
                products={suggestedProducts.slice(0, 30)}
                title="You may also like"
              />
            </section>
          </>
        )}

      </div>
    </div>
  )
}
