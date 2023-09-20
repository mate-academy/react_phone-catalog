/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../styles/pages/ProductDetails/ProductDetails.scss';

import { useState } from 'react';
import { Crumbs } from '../../components/Crumbs';
import { GoBackButton } from '../../components/GoBackButton';
import { ButtonsSelect } from '../../components/ButtonsSelect';
import { ProductSlider } from '../../components/ProductSlider';
import { getProducts } from '../../utils/product-mocks';
import { Button } from '../../components/Button';
import { ProdcutDetails } from '../../types/product';

type Props = {
  productDetails: ProdcutDetails;
};

export const ProductDetails: React.FC<Props> = ({ productDetails }) => {
  const {
    name,
    images,
    colorsAvailable,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    description,
  } = productDetails;

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const onImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <main className="product-details">
      <Crumbs />

      <div className="product-details__go-back">
        <GoBackButton />
      </div>

      <h1 className="product-details__title">
        {name}
      </h1>

      <section className="product-details__touchable-content">
        <div className="product-details__small-images">
          {images.map(image => (
            <img
              key={image}
              src={image}
              alt="phone"
              onClick={() => onImageClick(image)}
              className="product-details__small-image"
            />
          ))}
        </div>

        <img
          src={selectedImage}
          alt="phone"
          className="product-details__big-image"
        />

        <div className="product-details__right-menu">
          <div className="product-details__button-selector">
            <ButtonsSelect
              title="Available colors"
              contents={colorsAvailable}
              type="color"
            />
          </div>

          <div className="product-details__button-selector">
            <ButtonsSelect
              title="Select capacity"
              contents={capacityAvailable}
              type="text"
            />
          </div>

          <div className="product-details__prices">
            <h1 className="product-details__price">{`$${priceDiscount}`}</h1>

            <h2 className="product-details__full-price">{`$${priceRegular}`}</h2>
          </div>

          <div className="product-details__buy-fav-buttons">
            <Button content="text" isActive>
              Add to cart
            </Button>

            <div className="product-details__fav-button">
              <Button content="fav" />
            </div>
          </div>

          <div className="product-details__small-about">
            <div className="product-details__small-about-left">
              <p>Screen</p>
              <p>Resolution</p>
              <p>Processor</p>
              <p>RAM</p>
            </div>
            <div className="product-details__small-about-right">
              <p>{screen}</p>
              <p>{resolution}</p>
              <p>{processor}</p>
              <p>{ram}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-details__articles">
        <article className="product-details__about">
          <h1 className="product-details__about-title">
            About
          </h1>

          {description.map(article => (
            <article
              key={article.title}
              className="product-details__about-article"
            >
              <h3 className="product-details__about-article-title">
                {article.title}
              </h3>

              <p className="product-details__about-article-content">
                {article.text}
              </p>
            </article>
          ))}
        </article>

        <article className="product-details__tech-specs">
          <h1 className="product-details__tech-specs-title">Tech specs</h1>

          <div className="product-details__tech-specs-filling">
            <div className="product-details__tech-specs-left">
              <p>Screen</p>
              <p>Resolution</p>
              <p>Processor</p>
              <p>RAM</p>
              <p>Built in memory</p>
              <p>Camera</p>
              <p>Zoom</p>
              <p>Cell</p>
            </div>
            <div className="product-details__tech-specs-right">
              <p>{screen}</p>
              <p>{resolution}</p>
              <p>{processor}</p>
              <p>{ram}</p>
              <p>{capacity}</p>
              <p>{camera}</p>
              <p>{zoom}</p>
              <p>{cell}</p>
            </div>
          </div>
        </article>
      </section>

      <div className="product-details__slider">
        <ProductSlider
          title="You may also like"
          products={getProducts(10)}
          selected={[]}
          favourites={[]}
          onFavouritesClick={() => { }}
          onSelectedClick={() => { }}
        />
      </div>
    </main>
  );
};
