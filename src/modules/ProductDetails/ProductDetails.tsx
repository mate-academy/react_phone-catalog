import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetails.module.scss';
import { getProducts, getProductsByCategory } from '../../utils/getProducts';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer/Footer';
import { ProductView } from '../../components/ProductView';
import { RandomProducts } from '../../components/RandomProducts';
import { GetSliderProducts } from '../../utils/getSliderProducts';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ErrorMessage } from '../../components/ErrorMessage';
import { CategoryProduct } from '../../types/CategoryProduct';

export const ProductDetails = () => {
  const [item, setItem] = useState<Product>();
  const [currentProduct, setCurrentProduct] = useState<CategoryProduct>();
  const [deck, setDeck] = useState<CategoryProduct[]>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setReload(false);
    setError(false);

    getProducts()
      .then(products =>
        setItem(
          products.filter(
            product => product.itemId === location.pathname.split('/')[2],
          )[0],
        ),
      )
      .catch(() => setError(true));

    getProductsByCategory(location.pathname.split('/')[1])
      .then(products => {
        setDeck(
          products.filter(
            product => product.namespaceId === currentProduct?.namespaceId,
          ),
        );
        setCurrentProduct(
          products.filter(
            product => product.id === location.pathname.split('/')[2],
          )[0],
        );
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [location.pathname, reload, currentProduct?.namespaceId]);

  const sliderProducts = GetSliderProducts('random');

  const BackNavigate = () => {
    if (location.key === 'default') {
      return navigate('..');
    }

    return navigate(-1);
  };

  return (
    <div className="ProductDetails" id="ProductView">
      <Header />
      <div className="productMain">
        {isLoading && <Loader />}
        {error && <ErrorMessage reload={setReload} />}

        {item && currentProduct && !isLoading && !error && (
          <>
            <div className="container">
              <Breadcrumbs paragraph={'Phones'} model={item.name} />
              <div className="details__breadcrumbs">
                <div
                  className="left__arrow"
                  style={{ cursor: 'pointer' }}
                  onClick={() => BackNavigate()}
                ></div>
                <div
                  className="breadcrumbs__paragraph back__paragraph"
                  onClick={() => BackNavigate()}
                >
                  Back
                </div>
              </div>
              <ProductView
                currentProduct={currentProduct}
                product={item}
                deck={deck}
              />
            </div>
            <RandomProducts sliderProducts={sliderProducts} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
