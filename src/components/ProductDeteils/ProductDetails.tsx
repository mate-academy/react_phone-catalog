import { Product } from '../../types/Product';
import { ProductCardDescription } from '../Products/ProductCardDescription';
import { ProductDetailsImages } from './ProductDetailsImages';
import { ProductDetailsTechSpecs } from './ProductDetailsTechSpecs';

type Props = {
  productBasic: Product;
  productDetails: Product;
};

export const ProductDetails: React.FC<Props> = ({
  productBasic,
  productDetails,
}) => {
  return (
    <section
      className="product-details"
    >
      <ProductDetailsImages
        images={productDetails.images}
        id={productDetails.id}
      />
      <div className="product-details__product-card">
        <ProductCardDescription product={productBasic} />
      </div>

      <div
        data-cy="productDescription"
        className="product-details__section"
      >
        <h2 className="product-details__section__title">About</h2>

        <h3 className="product-details__section__subtitle">
          {productBasic.name}
        </h3>

        <p className="product-details__section__description">
          {productBasic.snippet}
        </p>

        <h3 className="product-details__section__subtitle">
          Description
        </h3>

        <p className="product-details__section__description">
          {productDetails.description}
        </p>

        <h3 className="product-details__section__subtitle">
          Additional features
        </h3>

        <p className="product-details__section__description">
          {productDetails.additionalFeatures || 'none'}
        </p>

      </div>

      <div className="product-details__section">
        <h2 className="product-details__section__title">Tech specs</h2>

        <ProductDetailsTechSpecs
          prop="Screen"
          value={productBasic.screen}
        />

        <ProductDetailsTechSpecs
          prop="Resolution"
          value={productDetails.display.screenResolution}
        />

        <ProductDetailsTechSpecs
          prop="Processor"
          value={productDetails.hardware.cpu}
        />

        <ProductDetailsTechSpecs
          prop="Battery"
          value={productDetails.battery.type}
        />

        <ProductDetailsTechSpecs
          prop="Capacity"
          value={productBasic.capacity}
        />

        <ProductDetailsTechSpecs
          prop="RAM"
          value={productBasic.ram}
        />

        <ProductDetailsTechSpecs
          prop="Camera"
          value={productDetails.camera.primary}
        />

        <ProductDetailsTechSpecs
          prop="Cell"
          value={productDetails.connectivity.cell}
        />

      </div>

    </section>
  );
};
