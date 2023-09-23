import { getPriceAfterDiscount } from '../../helpers/utils';
import { Product } from '../../types/Product';
import { FeatureList } from '../FeatureList';
import { ProductActions } from '../ProductActions';
import { ProductsSlider } from '../ProductsSlider';
import { ImagesSection } from './ImagesSection';

import './ProductDetails.scss';

type Props = {
  details: Product;
};

export const ProductDetails: React.FC<Props> = ({ details }) => {
  const {
    name,
    images,
    price,
    discount,
    screen,
    display,
    hardware,
    ram,
    description,
    connectivity,
    camera,
  } = details;
  const priceAfterDiscount = getPriceAfterDiscount(price, discount);

  return (
    <div className="ProductDetails">
      <h1 className="ProductDetails__title">{name}</h1>

      <div className="ProductDetails__main-details">
        <ImagesSection images={images} />

        <div className="ProductDetails__main-description">
          <div className="ProductDetails__price-section">
            <h2 className="ProductDetails__price">
              {String.fromCodePoint(0x00024) + priceAfterDiscount}
            </h2>
            {(discount !== 0) && (
              <div className="ProductDetails__initial-price">
                {String.fromCodePoint(0x00024) + price}
              </div>
            )}
          </div>
          <div className="ProductDetails__actions">
            <ProductActions product={details} />
          </div>
          <div className="ProductDetails__features">
            <FeatureList {...{
              screen,
              resolution: display.screenResolution,
              processor: hardware.cpu,
              ram,
            }}
            />
          </div>
        </div>
      </div>

      <div className="ProductDetails__additional-info">
        <div className="ProductDetails__about" data-cy="productDescription">
          <h2 className="ProductDetails__subtitle">About</h2>
          <p className="ProductDetails__about-text">{description}</p>
        </div>
        <div className="ProductDetails__tech-specs">
          <h2 className="ProductDetails__subtitle">Tech specs</h2>
          <FeatureList {...{
            screen,
            resolution: display.screenResolution,
            processor: hardware.cpu,
            camera: camera.primary,
            cell: connectivity.cell,
            ram,
          }}
          />
        </div>
      </div>
      <div className="ProductDetails__suggestions">
        <ProductsSlider
          key={name}
          title="You may also like"
          sortBy="age"
          filter="random"
        />
      </div>
    </div>
  );
};
