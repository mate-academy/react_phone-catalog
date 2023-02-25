import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsDetails } from '../../api/products';
import { CardCarousel } from '../../Components/CardCarousel';
import { DetailsOfProduct } from '../../Components/DetailsOfProduct';
import { Error } from '../../Components/Error';
import { Spinner } from '../../Components/Spinner';
import { setAlsoLikeProducts } from '../../helpers/functions';
import { DetailsOfProducts } from '../../types/DetailsOfProduct';
import { Product } from '../../types/Product';
import { SearchContext } from '../../variables/contexts';

export const ProductPage = () => {
  const { id: productId = '' } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [product, setProduct] = useState<DetailsOfProducts | null>(null);
  const [productsAlsoLike, setProductsAlsoLike] = useState<Product[]>([]);
  const { setSearchVisible } = useContext(SearchContext);

  useEffect(() => {
    setSearchVisible(false);
    setIsLoading(true);
    setIsError(false);
    Promise.all([getProductsDetails(productId), getProducts()])
      .then(receivedProduct => {
        setProduct(receivedProduct[0]);
        setProducts(receivedProduct[1]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [productId]);

  useEffect(() => {
    if (products) {
      setProductsAlsoLike(setAlsoLikeProducts(products));
    }
  }, [products]);

  if (isError) {
    <main className="page__main">
      <Error />
    </main>;
  }

  if (isLoading) {
    return (
      <main className="page__main">
        <Spinner />
      </main>
    );
  }

  const chosenProduct = (prod: Product[]) => {
    return prod.filter(el => el.phoneId === product?.id)[0];
  };

  const selectedProduct = chosenProduct(products);

  return (
    product && (
      <main className="page__main">
        <DetailsOfProduct product={product} selectedProduct={selectedProduct} />
        <CardCarousel
          products={productsAlsoLike}
          isLoading={isLoading}
          title="You may also like"
        />
      </main>
    )
  );
};
