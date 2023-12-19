import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMyContext } from '../context/context';
import { Product, ProductDetails } from '../helpers/Types';
import { ProductsSlider } from './ProductsSlider';

export type ProductDetailsProps = {
  product: ProductDetails
};

export const Details = ({ product }: ProductDetailsProps) => {
  const {
    products, isInFavourites, isInCart, toggleToCart, toggleToFavourites,
  } = useMyContext();

  const {
    price, discount, id, name, capacity, screen, ram, images, imageUrl, storage,
    sizeAndWeight, camera, battery, description,
  } = product;
  const [alsoLike, setAlsoLike] = useState<Product[]>([]);
  const [mainImage, setMainImage] = useState<string>(imageUrl);

  useEffect(() => {
    const randomSort = () => Math.random() - 0.5;

    setAlsoLike(() => products.sort(randomSort));
  }, [products]);

  const getFinalPrice = (startPrice: number, discountPrice: number) => {
    if (discountPrice <= 0) {
      return (<>{`$${startPrice}`}</>);
    }

    const finalPrice = ((startPrice * (100 - discount)) / 100).toFixed(0);

    return (
      <>
        {`$${finalPrice}`}
        <span className="productCard__price-fullPrice h2">
          {`$${startPrice}`}
        </span>
      </>
    );
  };

  const handleImageChange = (img: string) => {
    setMainImage(img);
  };

  return (
    <>
      <h1 className="page__title h1">{name}</h1>
      <div className="details">
        <div className="details__miniatures">
          {images.map((img) => (
            <button
              type="button"
              onClick={() => handleImageChange(img)}
              className="details__miniatures--button"
            >
              <img alt={img} src={img} key={img} />
            </button>
          ))}
        </div>
        <img className="details__image" alt="" src={mainImage} />

        <div className="details__price">
          <h2 className="productCard__price h2">
            {getFinalPrice(price, discount)}
          </h2>
          <div className="productCard__line" />

          <div className="productCard__details">
            <span className="productCard__details-label SmallText">Screen</span>
            <span className="productCard__details-value SmallText">
              {screen}
            </span>
          </div>
          <div className="productCard__details">
            <span className="productCard__details-label SmallText">
              Capacity
            </span>
            <span className="productCard__details-value SmallText">
              {capacity}
            </span>
          </div>
          <div className="productCard__details">
            <span className="productCard__details-label SmallText">RAM</span>
            <span className="productCard__details-value SmallText">{ram}</span>
          </div>
          <div className="productCard__buttons">
            <button
              type="button"
              className={classNames('productCard__buttons-cart',
                'buttons',
                {
                  'productCard__buttons-cart--addedToCart':
            isInCart(id),
                })}
              onClick={() => toggleToCart(id)}
            >
              {isInCart(id) ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className="productCard__buttons-favourites buttons"
              onClick={() => toggleToFavourites(id)}
              data-cy="addToFavorite"
            >
              {isInFavourites(id) ? (
                <img
                  alt="filledFavourites"
                  src="./img/filledFavourites.svg"
                />
              ) : (
                <img
                  alt="favourites"
                  src="./img/favourites.svg"
                />
              )}

            </button>
          </div>
        </div>
        <div className="details__id SmallText">{`ID: ${id}`}</div>
      </div>
      <div className="details">
        <div className="details__about" data-cy="productDescription">
          <h2 className="h2">About</h2>
          <div className="productCard__line" />
          <p className="details__about--p BodyText">{description}</p>
        </div>

        <div className="details__techSpecs">
          <h2 className="h2">Tech specs</h2>

          <div className="productCard__line" />

          <div className="productCard__details">
            <span className="productCard__details-label BodyText">RAM</span>
            <span className="productCard__details-value BodyText">{ram}</span>
          </div>

          <div className="productCard__details">
            <span className="productCard__details-label BodyText">
              Capacity
            </span>
            <span className="productCard__details-value BodyText">
              {capacity}
            </span>
          </div>

          <div className="productCard__details">
            <span className="productCard__details-label BodyText">RAM</span>
            <span className="productCard__details-value BodyText">{ram}</span>
          </div>

          <div className="productCard__details">
            <span className="productCard__details-label BodyText">Memeory</span>
            <span className="productCard__details-value BodyText">
              {storage.flash}
            </span>
          </div>

          <div className="productCard__details">
            <span className="productCard__details-label BodyText">Weight</span>
            <span className="productCard__details-value BodyText">
              {sizeAndWeight.weight}
            </span>
          </div>

          <div className="productCard__details">
            <span className="productCard__details-label BodyText">Camera</span>
            <span className="productCard__details-value BodyText">
              {camera.primary}
            </span>
          </div>

          <div className="productCard__details">
            <span className="productCard__details-label BodyText">Battery</span>
            <span className="productCard__details-value BodyText">
              {battery.type}
            </span>
          </div>

        </div>
      </div>
      <ProductsSlider
        products={alsoLike}
        title="You may also like"
      />
    </>
  );
};
