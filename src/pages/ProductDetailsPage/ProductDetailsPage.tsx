import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/getProductById';
import { getProducts } from '../../api/getProducts';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList/ProductList';
import { TechSpecs } from '../../components/TechSpecs/TechSpecs';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Choice } from '../../components/Choice';
import { priceWithDiscount } from '../../helpers/priceWithDiscount';
import { Order } from '../../components/Order';
import { BackButton } from '../../components/BackButton';
import { NoResults } from '../../components/NoResults';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [productDetails, setProductDetails]
    = useState<ProductDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [smallImgUrl, setSmallImgUrl] = useState('');
  const [error, setError] = useState(false);
  const { productId } = useParams();
  const suggestedProducts: Product[] = [];
  const newPrice = currentProduct ? priceWithDiscount(currentProduct) : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    if (document.readyState === 'complete') {
      ((async () => {
        try {
          const productsFromApi = await getProducts();
          const productByIdFromApi = await getProductById(productId || '');

          setProducts(productsFromApi);
          setProductDetails(productByIdFromApi);
          setError(false);
        } catch {
          setError(true);
        } finally {
          setIsLoading(false);
          setSmallImgUrl('');
        }
      }))();
    }
  }, [productId]);

  useEffect(() => {
    if (products && productId) {
      const match = products.find(product => product.id === productId);
      /* eslint-disable-next-line */
      match
        ? setCurrentProduct(match)
        : setError(true);
    }
  }, [products]);

  const getSuggestedProducts = () => {
    if (products.length) {
      do {
        const index = Math.floor(Math.random() * products.length);
        const randomProduct = products[index];
        const mismatch = suggestedProducts.every(
          product => product.id !== randomProduct.id,
        );

        if (mismatch) {
          suggestedProducts.push(randomProduct);
        }
      } while (suggestedProducts.length < 4);
    }

    return suggestedProducts;
  };

  return (
    <>
      {isLoading && <Loader />}

      {(!error && !isLoading)
        && (
          <>
            <div className="ProductDetailsPage">
              <div className="ProductDetailsPage__nav">
                <Breadcrumbs />
              </div>

              <BackButton />

              <h1 className="ProductDetailsPage__title">
                {currentProduct?.name}
              </h1>

              <section className="ProductDetailsPage__main">
                <div className="ProductDetailsPage__main-item">
                  {productDetails?.images.map(smallImage => (
                    <button
                      type="button"
                      key={smallImage}
                      className={classNames(
                        'ProductDetailsPage__small-img-container',
                        {
                          'ProductDetailsPage__small-img-container--active':
                        smallImage === smallImgUrl,
                        },
                      )}
                      onClick={() => {
                        setSmallImgUrl(smallImage);
                      }}
                    >
                      <img
                        src={smallImage}
                        className="ProductDetailsPage__image--small"
                        alt=""
                      />
                    </button>
                  ))}
                </div>

                <div className="ProductDetailsPage__main-item">
                  <img
                    className="ProductDetailsPage__image"
                    src={smallImgUrl || currentProduct?.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ProductDetailsPage__customer-choice">
                  <Choice />

                  <div className="container--center">
                    <h1>{`$${newPrice}`}</h1>
                    {currentProduct?.discount !== 0
                        && (
                          <h2
                            className="
                            ProductCard__price ProductCard__price--old
                          "
                          >
                            {`$${currentProduct?.price}`}
                          </h2>
                        )}
                  </div>
                  <br />
                  <Order
                    currentProduct={currentProduct}
                    buttonSize="big"
                  />
                  <br />
                  {productDetails
                    && (
                      <TechSpecs
                        product={productDetails}
                        title=""
                        baseClassName="small-text"
                      />
                    )}
                </div>
              </section>

              <section
                data-cy="productDescription"
                className="ProductDetailsPage__description"
              >
                <div className="ProductDetailsPage__description-item">
                  <h2>About</h2>
                  <div className="row" />
                  <p className="text text--light">
                    {productDetails?.description}
                  </p>
                </div>

                <div className="ProductDetailsPage__description-item">
                  {productDetails
                    && (
                      <TechSpecs
                        product={productDetails}
                        title="TechSpecs"
                        baseClassName="text"
                      />
                    )}
                </div>
              </section>

              <section data-cy="suggestedProducts">
                <h1>You may also like</h1>
                <br />
                <br />

                <ProductList productList={getSuggestedProducts()} />
              </section>
            </div>
          </>
        )}
      {(error && !isLoading)
        && <NoResults />}
    </>
  );
};
