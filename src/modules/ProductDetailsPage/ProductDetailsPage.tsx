import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductDetails } from '../../types/ProductDeatils';
import { ProductDetailsCard } from './components/ProductDetailsCard';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../HomePage/components/ProductsSlider/ProductsSlider';
import { BackButton } from './components/BackButton';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  fetchDataProducts: () => void;
};

export const ProductDetailsPage: React.FC<Props> = ({
  products,
  fetchDataProducts,
}) => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setIsError(false);

    fetch(`./api/${category}.json`)
      .then(res => res.json())
      .then((data: ProductDetails[]) => {
        const foundProduct = data.find(item => String(item.id) === productId);

        setProduct(foundProduct || null);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchDataProducts();
  }, [fetchDataProducts]);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const foundUsualProduct = products.find(p => p.itemId === productId);

  return (
    <>
      <div className="container">
        {isLoading && <Loader />}
        {isError && (
          <>
            <h1 className="ErrorMessage">Something went wrong</h1>
            <button className="ReloadButton" onClick={fetchData}>
              Reload
            </button>
          </>
        )}
        {!isLoading && !isError && !product && (
          <h1 className="ErrorMessage">Product was not found</h1>
        )}
        {!isLoading && !isError && product && (
          <>
            <Breadcrumbs />
            <BackButton />
            <ProductDetailsCard
              product={product}
              mainImage={mainImage}
              setMainImage={setMainImage}
              usualProduct={foundUsualProduct!}
            />
            <ProductsSlider title="You may also like" sortBy="random" />
          </>
        )}
      </div>
    </>
  );
};
