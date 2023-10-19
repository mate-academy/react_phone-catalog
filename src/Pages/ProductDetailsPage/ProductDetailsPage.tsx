import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../Components/Loader/Loader';
import {
  getProductDetails, getProducts, getSuggestedProducts,
} from '../../Helpers/api/products';
import { Product } from '../../Helpers/types/Product';
import './ProductDetailsPage.scss';
import { ProductSlider } from '../../Components/ProductSlider/ProductSlider';
import { BackButton } from '../../Components/BackButton/BackButton';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import { Header } from '../../Components/Header/Header';
import { ToCartButton } from '../../Components/ToCartButton/ToCartButton';
import { ToFavButton } from '../../Components/ToFavButton/ToFavButton';
import { deductDiscount } from '../../Helpers/functions/deductDiscount';
import { BASE_URL } from '../../Helpers/api/api';

const colors = ['gold', 'grey', 'black', 'white'];
const capacity = ['64', '256', '512'];

type Spec = { title: string, value: string };

export const ProductDetailsPage = () => {
  const [
    productFromServer, setProductFromServer,
  ] = useState<Product | null>(null);
  const [productFromList, setProductFromList] = useState<Product | null>(null);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [productNotFound, setProductNotFound] = useState(false);

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mainImg, setMainImg] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState(capacity[0]);

  const [loading, setLoading] = useState(false);

  const [specs, setSpecs] = useState<Spec[] | null>(null);
  const [moreSpecs, setMoreSpecs] = useState<Spec[] | null>(null);

  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (productId) {
      getProductDetails(productId)
        .then(res => {
          setProductFromServer(res);
          setMainImg(res.images[0]);

          const data = [
            { title: 'Screen', value: `${res.display.screenSize}` },
            { title: 'Resolution', value: `${res.display.screenResolution}` },
            { title: 'Processor', value: `${res.hardware.cpu}` },
            { title: 'RAM', value: `${res.storage.ram}` },
          ];

          setSpecs(data);
          setMoreSpecs([
            ...data,
            { title: 'Built in memory', value: `${res.storage.flash}` },
            { title: 'Camera', value: `${res.camera.primary}` },
            { title: 'Cell', value: `${res.connectivity.cell}` },
            { title: 'OS', value: `${res.android.os}` },
          ]);
        })
        .catch(() => setProductNotFound(true));
      getProducts()
        .then(res => {
          setProductFromList(
            res.find((item: Product) => item.id === productId),
          );
        });
      getSuggestedProducts()
        .then(res => {
          setRandomProducts(res);
          setLoading(false);
        });
    }

    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <>
      <Header />

      {loading && (
        <Loader />
      )}

      <div className="container">
        {productNotFound && (
          <h1 className="title">Phone was not found</h1>
        )}
        {productFromServer && productFromList && (
          <div className="ProductDetailsPage product">
            <Breadcrumbs name={productFromServer.name} />
            <BackButton />
            <h2 className="title ProductDetailsPage__title">
              {productFromServer.name}
            </h2>
            <div className="ProductDetailsPage__content">
              <div className="ProductDetailsPage__top page__section grid">
                <div className="grid__item grid__item--1-2">
                  <div
                    className="
                      ProductDetailsPage__images-small
                    "
                  >
                    {productFromServer.images
                      .slice(0, 5).map((image: string) => (
                        <div
                          className="grid__item grid__item--1-2"
                          key={image}
                        >
                          <button
                            type="button"
                            className={classNames(
                              'ProductDetailsPage__image-container',
                              {
                                'ProductDetailsPage__image-container--active':
                                mainImg === image,
                              },
                            )}
                            onClick={() => setMainImg(image)}
                          >
                            <img
                              src={`${BASE_URL}/${image}`}
                              alt="productImage"
                              className="ProductDetailsPage__image"
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="grid__item grid__item--3-12">
                  <img
                    src={`${BASE_URL}/${mainImg}`}
                    alt="productImage"
                    className="ProductDetailsPage__image"
                  />
                </div>
                <div className="grid__item grid__item--14-20">

                  <div className="ProductDetailsPage__short-desc">
                    <div className="ProductDetailsPage__short-desc-block">
                      <p className="text ProductDetailsPage__spec-name">
                        Available colors
                      </p>

                      <div className="ProductDetailsPage__spec-values">
                        {colors.map(color => (
                          <button
                            type="button"
                            className={classNames(
                              'ProductDetailsPage__spec-color',
                              {
                                'ProductDetailsPage__spec-color--selected':
                                color === selectedColor,
                              },
                            )}
                            key={color}
                            onClick={() => setSelectedColor(color)}
                          >
                            <div
                              className={`
                                ProductDetailsPage__spec-color
                                ProductDetailsPage__spec-color-inner
                                ProductDetailsPage__spec-color-inner--${color}
                              `}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div
                      className="
                        ProductDetailsPage__short-desc-block
                        ProductDetailsPage__short-desc-block--last
                      "
                    >
                      <p className="text ProductDetailsPage__spec-name">
                        Select capacity
                      </p>

                      <div className="ProductDetailsPage__spec-values">
                        {capacity.map(option => (
                          <button
                            type="button"
                            className={classNames(
                              'body-text',
                              'ProductDetailsPage__spec-capacity',
                              {
                                'ProductDetailsPage__spec-capacity--selected':
                                option === selectedCapacity,
                                'body-text--white':
                                option === selectedCapacity,
                              },
                            )}
                            key={option}
                            onClick={() => setSelectedCapacity(option)}
                          >
                            {`${option} GB`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="product__price">
                      <p className="title">
                        {`$${deductDiscount(productFromList)}`}
                      </p>
                      {productFromList.discount !== 0 && (
                        <p
                          className="
                            product__price-discount
                            body-text
                            body-text--light
                          "
                        >
                          {`$${productFromList.price}`}
                        </p>
                      )}
                    </div>

                    <div
                      className="
                        product__actions
                        product__actions--ProductDetailsPage
                      "
                    >
                      <ToCartButton
                        id={productFromServer.id}
                        product={productFromList}
                        isLarge
                      />
                      <ToFavButton
                        id={productFromServer.id}
                        product={productFromList}
                        isLarge
                      />
                    </div>

                    <div
                      className="product__details"
                    >
                      {specs?.map(spec => (
                        <div
                          className="product__details-pair"
                          key={spec.value}
                        >
                          <p className="text">{spec.title}</p>
                          <p className="text text--dark product__details-value">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid__item grid__item--23-24">
                  <p className="text text--light">{`ID: ${productFromServer.id}`}</p>
                </div>
              </div>

              <div className="page__section grid">
                <div className="grid__item grid__item--1-12">
                  <h3
                    className="
                      title title--sub ProductDetailsPage__title--sub
                    "
                  >
                    About
                  </h3>
                  <p className="body-text body-text--light">
                    {productFromServer.description}
                  </p>

                </div>
                <div className="grid__item grid__item--14-24">

                  <h3
                    className="
                      title title--sub ProductDetailsPage__title--sub
                    "
                  >
                    Tech specs
                  </h3>

                  <div
                    className="product__details"
                  >
                    {moreSpecs?.map(spec => (
                      <div
                        key={spec.title}
                        className="product__details-pair"
                      >
                        <p
                          className="body-text body-text--light"
                        >
                          {spec.title}
                        </p>
                        <p
                          className="
                            body-text
                            product__details-value
                          "
                        >
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="page__section">
                <ProductSlider
                  title="You may also like"
                  products={randomProducts}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
