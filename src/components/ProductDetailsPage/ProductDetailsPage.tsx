import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductInfo, getProducts } from '../../api/products';
import { ItemInfo } from '../../types/ItemInfo';
import { Product } from '../../types/Product';
import { AlsoLike } from '../AlsoLike/AlsoLike';
import { BackButton } from '../BackButton/BackButton';
import { Error } from '../Error/Error';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../Breadcrumbs/BreadCrumbs';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import { NotFoundProduct } from '../NotFoundProduct/NotFoundProduct';

export const ProductDetailsPage: React.FC = () => {
  const [activeProductInfo, setActiveProductInfo]
  = useState<ItemInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const { productId } = useParams();
  const location = useParams();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
        setIsLoading(false);
      } catch {
        setError('We can not load products.');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const activeProduct = products.find((element) => element.id === productId);

  useEffect(() => {
    const loadData = async () => {
      if (error) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      try {
        if (!activeProduct) {
          setActiveProductInfo(null);
        } else {
          const loadedProductInfo = await getProductInfo(activeProduct.id);

          setActiveProductInfo(loadedProductInfo);
          setIsLoading(false);
        }
      } catch {
        setError('We can not load productInfo.');
        setIsLoading(false);
      }
    };

    loadData();
    window.scrollTo(0, 0);
  }, [activeProduct, location]);

  return (
    <>
      <Header />

      <div className="container">
        {isLoading
          ? <Loader />
          : (
            <>
              <Breadcrumbs products={products} />

              <BackButton />

              {error
                ? <Error />
                : (
                  <>
                    {!activeProduct && (<NotFoundProduct />)}
                    {activeProduct && (
                      <ProductInfo
                        activeProduct={activeProduct}
                        activeProductInfo={activeProductInfo}
                      />
                    )}

                    {activeProduct && (
                      <AlsoLike
                        activeProduct={activeProduct}
                      />
                    )}
                  </>
                )}
            </>
          )}
      </div>

      <Footer />
    </>
  );
};
