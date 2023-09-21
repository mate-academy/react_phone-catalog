/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../styles/pages/ProductDetails/ProductDetails.scss';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Crumbs } from '../../components/Crumbs';
import { GoBackButton } from '../../components/GoBackButton';
import { ButtonsSelect } from '../../components/ButtonsSelect';
import { ProductSlider } from '../../components/ProductSlider';
import { getProductDetails } from '../../utils/product-mocks';
import { Button } from '../../components/Button';
import { Product, ProductDetails } from '../../types/product';
import { productApi } from '../../utils/api/productApi';
import { Loader } from '../../components/Loader';
import { Item } from '../../types/storageItem';
import { productService } from '../../utils/productService';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

type Props = {
  isIncluded: (items: Item<Product>[], value: Product) => boolean;
  cart: Item<Product>[];
  fav: Item<Product>[];
  onSelectedClick: (value: Product) => void;
  onFavClick: (value: Product) => void;
};

export const ProductDetailsPage: React.FC<Props> = ({
  isIncluded,
  cart,
  fav,
  onSelectedClick,
  onFavClick,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails]
    = useState<ProductDetails>(getProductDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(0);
  const { itemId } = useParams();

  const normalizedItemId = itemId || '';

  useEffect(() => {
    setIsLoading(true);

    productApi.getDetails(normalizedItemId.toString())
      .then(setProductDetails)
      .finally(() => setIsLoading(false));

    productApi.getAll
      .then(setProducts);
  }, [normalizedItemId]);

  const value = useMemo(() => {
    const item = products.filter(product => {
      return product.itemId === normalizedItemId.toString();
    })[0];

    return item;
  }, [normalizedItemId, products]);

  const onImageClick = (id: number) => {
    setSelectedImageId(id);
  };

  const {
    name,
    color,
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

  return (
    <main className="product-details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Crumbs />

          <div className="product-details__go-back">
            <GoBackButton />
          </div>

          <h1 className="product-details__title">
            {name}
          </h1>

          <section className="product-details__touchable-content">
            <div className="product-details__small-images">
              {images.map((image, index) => (
                <img
                  key={image}
                  src={BASE_URL + image}
                  alt="phone"
                  onClick={() => onImageClick(index)}
                  className="product-details__small-image"
                />
              ))}
            </div>

            <img
              src={BASE_URL + images[selectedImageId]}
              alt="phone"
              className="product-details__big-image"
            />

            <div className="product-details__right-menu">
              <div className="product-details__button-selector">
                <ButtonsSelect
                  title="Available colors"
                  contents={colorsAvailable}
                  type="color"
                  activeContent={color}
                />
              </div>

              <div className="product-details__button-selector">
                <ButtonsSelect
                  title="Select capacity"
                  contents={capacityAvailable}
                  type="text"
                  activeContent={capacity}
                />
              </div>

              <div className="product-details__prices">
                <h1 className="product-details__price">{`$${priceDiscount}`}</h1>

                <h2 className="product-details__full-price">{`$${priceRegular}`}</h2>
              </div>

              <div className="product-details__buy-fav-buttons">
                <Button
                  content="text"
                  onClick={() => onSelectedClick(value)}
                  isActive={!isIncluded(cart, value)}
                  isSelected={isIncluded(cart, value)}
                >
                  {isIncluded(cart, value) ? (
                    'Added to cart'
                  ) : (
                    'Add to cart'
                  )}
                </Button>

                <div className="product-details__fav-button">
                  <Button
                    content="fav"
                    onClick={() => onFavClick(value)}
                    isActive={isIncluded(fav, value)}
                  />
                </div>
              </div>

              <div className="product-details__small-about">
                <ul className="product-details__small-about-left">
                  <li>Screen</li>
                  <li>Resolution</li>
                  <li>Processor</li>
                  <li>RAM</li>
                </ul>
                <ul className="product-details__small-about-right">
                  <li>{screen}</li>
                  <li>{resolution}</li>
                  <li>{processor}</li>
                  <li>{ram}</li>
                </ul>
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
                <ul className="product-details__tech-specs-left">
                  <li>Screen</li>
                  <li>Resolution</li>
                  <li>Processor</li>
                  <li>RAM</li>
                  <li>Built in memory</li>
                  <li>Camera</li>
                  <li>Zoom</li>
                  <li>Cell</li>
                </ul>
                <ul className="product-details__tech-specs-right">
                  <li>{screen}</li>
                  <li>{resolution}</li>
                  <li>{processor}</li>
                  <li>{ram}</li>
                  <li>{capacity}</li>
                  <li>{camera}</li>
                  <li>{zoom}</li>
                  <li>{cell.join(', ')}</li>
                </ul>
              </div>
            </article>
          </section>

          <div className="product-details__slider">
            <ProductSlider
              title="You may also like"
              products={productService.getRandomProducts(products)}
              cart={cart}
              fav={fav}
              isIncluded={isIncluded}
              onFavClick={onFavClick}
              onSelectedClick={onSelectedClick}
            />
          </div>
        </>
      )}
    </main>
  );
};
