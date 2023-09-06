import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PathDisplay, ProductsSlider, Wrapper } from '../../components';
import './ProductDetailsPage.scss';
import { getProductById } from '../../api/products';
import { ButtonType, IconButtonType, Product } from '../../types';
import { ProductImage } from './components/ProductImage';
import { Colors } from './components/Colors';
import { AvailableCapacity } from './components/AvailableCapacity';
import { Button, IconButton } from '../../bits';
import { useProducts } from '../../context';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { products } = useProducts();
  const [phone, setPhone] = useState<Product | null>(null);

  console.log('phone', phone);

  useEffect(() => {
    if (productId) {
      getProductById(productId)
        .then(setPhone);
    }
  }, []);

  // console.log('phone', phone);

  return (
    <div className="product-details">
      <Wrapper>
        <div className="product-details__path-container">
          <PathDisplay />
        </div>

        <div className="product-details__back">back</div>
        <h1
          className="product-details__title"
        >
          {phone?.name}
        </h1>

        <div className="product-details__upper-block">
          {phone?.images && (
            <ProductImage images={phone?.images} />
          )}

          <div className="product-details__upper-right">
            {phone?.colorsAvailable && (
              <Colors colors={phone?.colorsAvailable} />
            )}

            {phone?.capacityAvailable && (
              <AvailableCapacity
                capacities={phone?.capacityAvailable}
                currCapacity={phone?.capacity}
              />
            )}

            <div className="product-details__price-block">
              <p className="product-details__price-discount">{`$${phone?.priceDiscount}`}</p>
              <p className="product-details__price-regular">{`$${phone?.priceRegular}`}</p>
            </div>

            <div className="product-details__btns-block">
              <Button size={ButtonType.large} />

              <IconButton type={IconButtonType.favLarge} />
            </div>

            <div className="product-details__specs">
              <p>Screen</p>
              <p className="product-card__specs--right">{phone?.screen}</p>
              <p>Resolution</p>
              <p className="product-card__specs--right">{phone?.resolution}</p>
              <p>Proccessor</p>
              <p className="product-card__specs--right">{phone?.processor}</p>
              <p>RAM</p>
              <p className="product-card__specs--right">{phone?.ram}</p>
            </div>
          </div>
        </div>

        <div className="product-details__lower-block">
          <div className="product-details__about">

            <h2 className="product-details__about-heading">about</h2>

            <h3
              className="product-details__about-title"
            >
              {phone?.description[0].title}
            </h3>

            <p
              className="product-details__about-text"
            >
              {phone?.description[0].text}
            </p>

            <h3
              className="product-details__about-title"
            >
              {phone?.description[1].title}
            </h3>

            <p
              className="product-details__about-text"
            >
              {phone?.description[1].text}
            </p>

            <h3
              className="product-details__about-title"
            >
              {phone?.description[2].title}
            </h3>

            <p
              className="product-details__about-text"
            >
              {phone?.description[2].text}
            </p>
          </div>

          <div>
            <h2 className="product-details__about-heading">tech specs</h2>

            <div className="product-details__tech-specs">
              <p>Screen</p>
              <p className="product-card__specs--right">{phone?.screen}</p>
              <p>Resolution</p>
              <p
                className="product-card__specs--right"
              >
                {phone?.resolution}
              </p>
              <p>Proccessor</p>
              <p className="product-card__specs--right">{phone?.processor}</p>
              <p>RAM</p>
              <p className="product-card__specs--right">{phone?.ram}</p>
              <p>Built in memory</p>
              <p className="product-card__specs--right">{phone?.capacity}</p>
              <p>Camera</p>
              <p className="product-card__specs--right">{phone?.camera}</p>
              <p>Zoom</p>
              <p className="product-card__specs--right">{phone?.zoom}</p>
              <p>Cell</p>
              <p className="product-card__specs--right">
                {phone?.cell.join(', ')}
              </p>
            </div>
          </div>
        </div>

        <div className="product-details__also-like-container">
          <ProductsSlider
            title="you may also like"
            products={products}
          />
        </div>
      </Wrapper>
    </div>
  );
};
