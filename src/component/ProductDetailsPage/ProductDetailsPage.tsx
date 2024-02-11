import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../../api/api';
import { Loader } from '../Loader';
import { Phone } from '../../Type/Phone';
import { Footer } from '../Footer';
import { ProductsSlider } from '../ProductsSlider';
import { ProductContext } from '../../ProductContext';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductDetailsPage = () => {
  const {
    products,
    cartItems,
    favourites,
    hasItems,
    addCart,
    addFavourites,
  } = useContext(ProductContext);

  const [product, setProduct] = useState<Phone>();
  const [loading, setLoading] = useState<boolean>(false);
  const [slideActive, setSlideActive] = useState<string>('');

  const { productId } = useParams<{ productId: string }>();

  const findProduct = [...products].find((prod) => {
    return prod.itemId === product?.id;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getProduct(productId || '');

        setProduct(result);

        if (result?.images) {
          setSlideActive(result.images[0]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (loading || !product || !findProduct) {
    return <Loader />;
  }

  return (
    <section className="details">
      <div className="container">

        <div className="details__url" data-cy="breadCrumbs">
          <Link
            to="/"
            className="details__url__home"
          >
            <img src="./icon/Home.svg" alt="home" />
          </Link>

          <img src="./icon/Right.svg" alt="Right" />

          <Link
            to="/phones"
            className="details__url__phones"
          >
            Phones
          </Link>

          <img src="./icon/Right.svg" alt="Right" />

          <p className="details__url__product">
            {product.name}
          </p>
        </div>

        <Link
          to="../"
          className="details__back"
          data-cy="backButton"
        >
          Back
        </Link>

        <h1 className="details__title">
          {product?.name}
        </h1>

        <div className="details__wrap">
          <div className="details__slider">
            <div className="details__slider__pagination">
              {product.images.map((image: string) => (
                <button
                  type="button"
                  key={image}
                  className="details__slider__item"
                  onClick={() => setSlideActive(image)}
                >
                  <img
                    className="details__slider__item-img"
                    src={`${BASE_URL}${image}`}
                    alt="Phone"
                  />
                </button>
              ))}
            </div>

            <div className="details__slider__active">
              <img src={`${BASE_URL}${slideActive}`} alt="Phone" className="details__slider__active-img" />
            </div>
          </div>

          <div className="details__wrap-information">
            <div className="details__colors">
              <p className="details__colors__title">
                Available colors
              </p>

              <div className="details__colors__color" />
            </div>

            <div className="details__capacity">
              <div className="details__capacity__title"> Select capacity </div>

              <div className="details__capacity__wrap">
                {product.capacityAvailable.map((capacity) => (
                  <button
                    type="button"
                    className="details__capacity__btn"
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className="details__prise">
              <div className="details__prise__wrap">
                <p className="details__prise-new">
                  {`$${product.priceRegular}`}
                </p>
                <p className="details__prise-old">
                  {`$${product.priceDiscount}`}
                </p>
              </div>

              <div className="details__prise__buttons">
                <button
                  type="button"
                  className={cn(
                    'details__prise__buttons-add',
                    { selected: hasItems(+findProduct.id, cartItems) },
                  )}
                  onClick={() => addCart(+findProduct.id, findProduct)}
                >
                  {hasItems(+findProduct.id, cartItems)
                    ? ('Selected')
                    : ('Add to cart')}
                </button>

                <button
                  type="button"
                  className="details__prise__buttons-like"
                  onClick={() => addFavourites(+findProduct.id, findProduct)}
                >
                  {hasItems(+findProduct.id, favourites)
                    ? (
                      <img
                        src="./icon/Favourites.svg"
                        alt="Favourites"
                      />
                    )
                    : (
                      <img
                        src="./icon/Like.svg"
                        alt="like"
                      />
                    )}
                </button>
              </div>
            </div>

            <div className="details__characteristic">
              <p className="details__characteristic-type">
                Screen
              </p>

              <p className="details__characteristic-value">
                {product.screen}
              </p>
            </div>

            <div className="details__characteristic">
              <p className="details__characteristic-type">
                Resolution
              </p>

              <p className="details__characteristic-value">
                {product.resolution}
              </p>
            </div>

            <div className="details__characteristic">
              <p className="details__characteristic-type">
                Processor
              </p>

              <p className="details__characteristic-value">
                {product.processor}
              </p>
            </div>

            <div className="details__characteristic">
              <p className="details__characteristic-type">
                RAM
              </p>

              <p className="details__characteristic-value">
                {product.ram}
              </p>
            </div>
          </div>
        </div>

        <div className="details__wrap">
          <div className="details__about" data-cy="productDescription">
            <h2 className="details__about__title"> About </h2>

            {product.description.map((desc) => (
              <div className="details__about__desc">
                <h3 className="details__about__desc-title">
                  {desc.title}
                </h3>

                <p className="details__about__desc-text">
                  {desc.text}
                </p>
              </div>
            ))}
          </div>

          <div className="details__specs">
            <h2 className="details__specs__title"> Tech specs </h2>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> Screen </p>

              <p className="details__specs__value">
                {product.screen}
              </p>
            </div>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> Resolution </p>

              <p className="details__specs__value">
                {product.resolution}
              </p>
            </div>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> Processor </p>

              <p className="details__specs__value">
                {product.processor}
              </p>
            </div>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> RAM </p>

              <p className="details__specs__value">
                {product.ram}
              </p>
            </div>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> Built in memory </p>

              <p className="details__specs__value">
                {product.capacity}
              </p>
            </div>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> Camera </p>

              <p className="details__specs__value">
                {product.camera}
              </p>
            </div>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> Zoom </p>

              <p className="details__specs__value">
                {product.zoom}
              </p>
            </div>

            <div className="details__specs__wrap">
              <p className="details__specs__name"> Cell </p>

              <div className="details__specs__values">
                {product.cell.map((c) => (
                  <p
                    className="details__specs__value details__specs__value-cell"
                  >
                    {c}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ProductsSlider
          title="You may also like"
          sale
        />
      </div>

      <Footer />
    </section>
  );
};
