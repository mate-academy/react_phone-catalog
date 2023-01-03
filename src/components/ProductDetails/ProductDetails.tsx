import ImagesSection from './ImagesSection';
import { ProductActionButtons } from '../ProductActionButtons';
import './ProductDetails.scss';
import { FeaturesList } from '../FeaturesList';
import { ProductsSlider } from '../ProductsSlider';

export const ProductDetails:React.FC<Product> = (props) => {
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
  } = props;
  const priceAfterDiscount = price * ((100 - discount) / 100);

  return (
    <div className="product-details">
      <div className="product-details__title">
        <h1 className="main-title">
          {name}
        </h1>
      </div>
      <div className="grid product-details__main-details">
        <ImagesSection images={images} />
        <div className="product-details__main-description">
          <div className="product-details__price">
            <h1 className="main-title">
              {String.fromCodePoint(0x00024)}
              {priceAfterDiscount}
            </h1>
            {(discount !== 0) && (
              <div className="product-details__initial-price">
                {String.fromCodePoint(0x00024)}
                {price}
              </div>
            )}
          </div>
          <div className="product-details__actions">
            <ProductActionButtons {...props} />
          </div>
          <div className="product-details__features">
            <FeaturesList {...{
              screen,
              resolution: display.screenResolution,
              processor: hardware.cpu,
              ram,
            }}
            />
          </div>
        </div>
      </div>
      <div className="grid product-details__additional-info">
        <div className="product-details__about">
          <h2 className="product-details__subtitle">About</h2>
          <p className="product-details__about-text">{description}</p>
        </div>
        <div className="product-details__tech-specs">
          <h2 className="product-details__subtitle">Tech specs</h2>
          <FeaturesList {...{
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
      <div className="product-details__suggested-products">
        <ProductsSlider
          key={name}
          title="You may also like"
          sortBy="age"
          filterCriteria="random"
        />
      </div>
    </div>
  );
};
