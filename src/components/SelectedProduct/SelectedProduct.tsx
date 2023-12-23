import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { SelectedTechProduct } from '../../types/SelectedTechProduct';
import { TechProductsContext } from '../../stores/TechProductsContext';
import { clickInNext, clickInPrev } from '../../helpers/carouselMoving';
import { Carousel } from '../Carousel/Carousel';
import { ButtonBack } from '../ButtonBack/ButtonBack';
import { ProductsColors } from '../../vars/ProductsColors';
import './SelectedProduct.scss';

type Props = {
  product: SelectedTechProduct,
};

export const SelectedProduct: React.FC<Props> = ({
  product,
}) => {
  const {
    productsAlsoLike,
    techProducts,
    loadTechProducts,
    getSuggestedProducts,
    cart,
    addInCart,
    favouritesProducts,
    likeFunc,
    dislikeFunc,
  } = useContext(TechProductsContext);

  const {
    id,
    name,
    color,
    capacity,
    namespaceId,
    images,
    priceDiscount,
    priceRegular,
    colorsAvailable,
    capacityAvailable,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = product;

  const likeDislike = () => {
    return favouritesProducts
      .map((pRoduct) => pRoduct.itemId).includes(id)
      ? dislikeFunc(id)
      : likeFunc({
        itemId: id,
        image: images[0],
        name,
        fullPrice: priceRegular,
        price: priceDiscount,
        screen,
        capacity,
        ram,
      });
  };

  const productId = techProducts.find(pr => pr.itemId === id)?.id;
  const Category = techProducts.find(pr => pr.itemId === id)?.category;

  useEffect(() => {
    loadTechProducts();
  }, []);

  useEffect(() => {
    if (Category) {
      getSuggestedProducts(name, namespaceId, Category);
    }
  }, [Category]);

  const [bigImageSelectProduct, setBigImageSelectProduct] = useState(images[0]);
  const [
    movingMobileProductCarousel,
    setMovingMobileProductCarousel,
  ] = useState(0);

  const [movingCarouselAlsoLike, setMovingCarouselAlsoLike] = useState(0);
  const [widthCarousel, setWidthCarousel] = useState(0);
  const endCarousel = productsAlsoLike.length - widthCarousel / 290;

  const getLinkClassColor = ({ isActive }:{ isActive: boolean }) => {
    return cn(
      'selected-product__color-link',
      { 'selected-product__color-link--active': isActive },
    );
  };

  const getLinkClassCapacity = ({ isActive }:{ isActive: boolean }) => {
    return cn(
      'selected-product__capacity-link',
      { 'selected-product__capacity-link--active': isActive },
    );
  };

  const prevMobileProductImage = () => {
    if (movingMobileProductCarousel - 1 > 0) {
      setMovingMobileProductCarousel(
        Math.max(movingMobileProductCarousel - 1, 0),
      );
    } else {
      setMovingMobileProductCarousel(0);
    }
  };

  const nextMobileProductImage = () => {
    if (movingMobileProductCarousel + 1 <= images.length - 1) {
      setMovingMobileProductCarousel(
        Math.min(movingMobileProductCarousel + 1, images.length - 1),
      );
    } else {
      setMovingMobileProductCarousel(images.length - 1);
    }
  };

  return (
    <div className="selected-product">
      {
        Category && (
          <ButtonBack
            back={Category}
          />
        )
      }

      <div className="grid-cover">
        <h1 className="selected-product__title">
          {name}
        </h1>

        <div className="selected-product__photo-info-product-container">
          <div className="selected-product__left-block">
            <div
              // eslint-disable-next-line
              className="mobile-carousel-container mobile-carousel-container--mobile-product-photos"
            >
              <button
                type="button"
                className={
                  !movingMobileProductCarousel
                  // eslint-disable-next-line
                    ? 'mobile-carousel-container__arrow-disabled mobile-carousel-container__arrow-disabled--right'
                    // eslint-disable-next-line
                    : 'mobile-carousel-container__arrow mobile-carousel-container__arrow--right'
                }
                onClick={prevMobileProductImage}
              >
                <div
                  className={
                    !movingMobileProductCarousel
                      ? 'icon icon--mobile-arrow-left-disabled'
                      : 'icon icon--mobile-arrow-left'
                  }
                />
              </button>

              <div className="selected-product__mobile-photo-product-carousel">
                <ul
                  className="selected-product__carousel-list"
                >
                  {
                    images.map((image) => (
                      <li
                        style={
                          {
                            transition: '500ms',
                            transform: `translateX(-${movingMobileProductCarousel * 250}px)`,
                          }
                        }
                        key={image}
                      >
                        <img
                          alt="phone"
                          src={image}
                          className="selected-product__carousel-image"
                        />
                      </li>
                    ))
                  }
                </ul>
              </div>

              <button
                type="button"
                className={
                  movingMobileProductCarousel === images.length - 1
                  // eslint-disable-next-line
                    ? 'mobile-carousel-container__arrow-disabled mobile-carousel-container__arrow-disabled--right'
                    // eslint-disable-next-line
                    : 'mobile-carousel-container__arrow mobile-carousel-container__arrow--right'
                }
                onClick={nextMobileProductImage}
              >
                <div
                  className={
                    movingMobileProductCarousel === images.length - 1
                      ? 'icon icon--mobile-arrow-right-disabled'
                      : 'icon icon--mobile-arrow-right'
                  }
                />
              </button>
            </div>

            <div className="selected-product__mini-images-container">
              {
                images.map((image) => (
                  <button
                    type="button"
                    style={image === bigImageSelectProduct
                      ? { border: '1px solid #000' } : {}}
                    key={image}
                    className="selected-product__mini-image-container"
                    onClick={() => setBigImageSelectProduct(image)}
                  >
                    <img
                      alt="phone"
                      className="selected-product__mini-image"
                      src={image}
                    />
                  </button>
                ))
              }
            </div>

            <div className="selected-product__big-image-container">
              <div className="selected-product__big-image">
                <img
                  alt="phone"
                  className="selected-product__image"
                  src={bigImageSelectProduct}
                />
              </div>
            </div>
          </div>

          <div className="selected-product__right-block">
            <div className="selected-product__colors-id-container">
              <h3 className="selected-product__colors-id-title">
                Available colors
              </h3>

              <h3 className="selected-product__colors-id-title">
                {`ID: ${productId}`}
              </h3>
            </div>

            <div className="selected-product__color-images-container">
              <ul className="selected-product__colors-list">
                {
                  colorsAvailable.map((coloR) => (
                    <li key={coloR} className="selected-product__color-item">
                      <NavLink
                        title={coloR}
                        to={`/product/${namespaceId}-${capacity.toLowerCase()}-${coloR}`}
                        className={getLinkClassColor}
                      >
                        <div
                          style={
                            {
                              backgroundColor: `${ProductsColors.find((col) => col.color === coloR)?.hash}`,
                            }
                          }
                          className="selected-product__color"
                        />
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="separator separator--under-phone-colors" />

            <div className="selected-product__capacities-container">
              <h3 className="selected-product__capacity-title">
                Select capacity
              </h3>

              <ul className="selected-product__capacities-list">
                {
                  capacityAvailable.map((capacitY) => (
                    <li
                      key={capacitY}
                      className="selected-product__capacity-item"
                    >
                      <NavLink
                        to={`/product/${namespaceId}-${capacitY.toLowerCase()}-${color}`}
                        className={getLinkClassCapacity}
                      >
                        {capacitY}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="separator separator--under-phone-capacities" />

            <div className="selected-product__price-container">
              <h2 className="selected-product__price selected-product__price--sale">{`$${priceDiscount}`}</h2>
              <h2 className="selected-product__price selected-product__price--real">{`$${priceRegular}`}</h2>
            </div>

            <div className="selected-product__buttons-container">
              <button
                type="button"
                className={
                  cn(
                    'button selected-product__button-add-to-cart',
                    {
                      // eslint-disable-next-line
                      'button selected-product__button-add-to-cart selected-product__button-add-to-cart--added':
                      cart.map((c) => c.itemId).includes(product.id),
                    },
                  )
                }
                onClick={() => addInCart({
                  itemId: id,
                  image: images[0],
                  name,
                  price: priceDiscount,
                  count: 1,
                })}
                disabled={cart.map((c) => c.itemId).includes(product.id)}
              >
                {cart.map((c) => c.itemId)
                  .includes(product.id) ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                type="button"
                data-cy="addToFavorite"
                className="selected-product__like-button-wrapper"
                onClick={() => likeDislike()}
              >
                <div
                  className={
                    cn(
                      'icon icon--favourite',
                      {
                        'icon icon--favourite icon-favourite-active':
                          favouritesProducts.map((pRoduct) => pRoduct.itemId)
                            .includes(product.id),
                      },
                    )
                  }
                />
              </button>
            </div>

            <div className="selected-product__charachters-container">
              <div className="selected-product__character-container">
                <h3 className="selected-product__character-title">Screen</h3>
                <h3 className="selected-product__character">{screen}</h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title"
                >
                  Resolution
                </h3>

                <h3 className="selected-product__character">{resolution}</h3>
              </div>

              <div className="selected-product__character-container">
                <h3 className="selected-product__character-title">
                  Processor
                </h3>

                <h3 className="selected-product__character">{processor}</h3>
              </div>

              <div className="selected-product__character-container">
                <h3 className="selected-product__character-title">RAM</h3>
                <h3 className="selected-product__character">{ram}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="selected-product__more-info-about-product-container">
          <div
            className="selected-product__left-block"
            data-cy="productDescription"
          >
            <h2 className="selected-product__about-title">
              About
            </h2>

            <div className="separator separator--under-title-about" />

            {
              description.map((desc) => {
                const { title, text } = desc;

                return (
                  <div
                    key={title}
                    className="selected-product__about-sub-info-block"
                  >
                    <h3 className="selected-product__about-subtitle">
                      {title}
                    </h3>

                    {
                      text.map((t) => (
                        <p key={t} className="selected-product__about-info">
                          {t}
                          <br />
                          <br />
                        </p>
                      ))
                    }
                  </div>
                );
              })
            }
          </div>

          <div className="selected-product__right-block">
            <h2 className="selected-product__tech-specs-title">
              Tech specs
            </h2>

            <div className="separator separator--under-title-tech-specs" />

            <div
              className="selected-product__charachters-container
                selected-product__charachters-container--tech-specs"
            >
              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  Screen
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {screen}
                </h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  Resolution
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {resolution}
                </h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  Processor
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {processor}
                </h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  RAM
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {ram}
                </h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  Built in memory
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {capacity}
                </h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  Camera
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {camera}
                </h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  Zoom
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {zoom}
                </h3>
              </div>

              <div className="selected-product__character-container">
                <h3
                  className="selected-product__character-title
                    selected-product__character-title--tech-specs"
                >
                  Cell
                </h3>

                <h3
                  className="selected-product__character
                    selected-product__character--tech-specs"
                >
                  {cell.join(', ')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="also-like__title-arrows-container">
        <h1 className="also-like__title">
          You may also like
        </h1>

        <div className="carousel-buttons">
          <button
            type="button"
            className={
              !movingCarouselAlsoLike
              // eslint-disable-next-line
                ? 'carousel-buttons__arrow-disabled carousel-buttons__arrow-disabled--left'
                : 'carousel-buttons__arrow carousel-buttons__arrow--left'
            }
            onClick={() => clickInPrev(
              movingCarouselAlsoLike,
              setMovingCarouselAlsoLike,
              widthCarousel / 290,
            )}
          >
            <div
              className={
                !movingCarouselAlsoLike
                  ? 'icon icon--arrow-left-disabled'
                  : 'icon icon--arrow-left'
              }
            />
          </button>

          <button
            type="button"
            className={
              movingCarouselAlsoLike === endCarousel
              // eslint-disable-next-line
                ? 'carousel-buttons__arrow-disabled carousel-buttons__arrow-disabled--right'
                : 'carousel-buttons__arrow carousel-buttons__arrow--right'
            }
            onClick={() => clickInNext(
              movingCarouselAlsoLike,
              setMovingCarouselAlsoLike,
              productsAlsoLike.length,
              widthCarousel / 290,
            )}
          >
            <div
              className={
                movingCarouselAlsoLike === endCarousel
                  ? 'icon icon--arrow-right-disabled'
                  : 'icon icon--arrow-right'
              }
            />
          </button>
        </div>
      </div>

      <div className="mobile-carousel-container">
        <button
          type="button"
          className={
            !movingCarouselAlsoLike
            // eslint-disable-next-line
              ? 'mobile-carousel-container__arrow-disabled mobile-carousel-container__arrow-disabled--right'
              // eslint-disable-next-line
              : 'mobile-carousel-container__arrow mobile-carousel-container__arrow--right'
          }
          onClick={() => clickInPrev(
            movingCarouselAlsoLike,
            setMovingCarouselAlsoLike,
            widthCarousel / 290,
          )}
        >
          <div
            className={
              !movingCarouselAlsoLike
                ? 'icon icon--mobile-arrow-left-disabled'
                : 'icon icon--mobile-arrow-left'
            }
          />
        </button>

        <Carousel
          movingCarousel={movingCarouselAlsoLike}
          phones={productsAlsoLike}
          setWidthCarousel={setWidthCarousel}
        />

        <button
          type="button"
          className={
            movingCarouselAlsoLike === endCarousel
            // eslint-disable-next-line
              ? 'mobile-carousel-container__arrow-disabled mobile-carousel-container__arrow-disabled--right'
              // eslint-disable-next-line
              : 'mobile-carousel-container__arrow mobile-carousel-container__arrow--right'
          }
          onClick={() => clickInNext(
            movingCarouselAlsoLike,
            setMovingCarouselAlsoLike,
            productsAlsoLike.length,
            widthCarousel / 290,
          )}
        >
          <div
            className={
              movingCarouselAlsoLike === endCarousel
                ? 'icon icon--mobile-arrow-right-disabled'
                : 'icon icon--mobile-arrow-right'
            }
          />
        </button>
      </div>
    </div>
  );
};
