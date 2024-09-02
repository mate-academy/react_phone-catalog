import { ProductContent } from '../../../../components/ProductContent';
import { ProductTypeExtended } from '../../../../types/ProductTypeExtended';

type Props = {
  className?: string;
  product: ProductTypeExtended | undefined;
};

export const Details: React.FC<Props> = ({ className = '', product }) => {
  return (
    <section className={`details ${className}`.trim()}>
      <div className="container">
        <ProductContent
          className="details__product-content product-content--details"
          product={product}
        />

        <div className="details__block details__block--about">
          <h3 className="details__block-title">About</h3>

          {product?.description.map(desc => (
            <div className="details__block-content" key={desc.title}>
              <h4 className="details__block-subtitle">{desc.title}</h4>
              <div className="details__block-text">{desc.text}</div>
            </div>
          ))}
        </div>

        <div className="details__block details__block--specs">
          <h3 className="details__block-title">Tech specs</h3>

          <ul className="details__block-specs">
            <li className="details__block-specs-item">
              Screen
              <span className="details__block-specs-value">
                {product?.screen}
              </span>
            </li>
            <li className="details__block-specs-item">
              Resolution
              <span className="details__block-specs-value">
                {product?.resolution}
              </span>
            </li>
            <li className="details__block-specs-item">
              Processor
              <span className="details__block-specs-value">
                {product?.processor}
              </span>
            </li>
            <li className="details__block-specs-item">
              RAM
              <span className="details__block-specs-value">{product?.ram}</span>
            </li>
            <li className="details__block-specs-item">
              Built in memory
              <span className="details__block-specs-value">
                {product?.capacity}
              </span>
            </li>
            <li className="details__block-specs-item">
              Camera
              <span className="details__block-specs-value">
                {product?.camera}
              </span>
            </li>
            <li className="details__block-specs-item">
              Zoom
              <span className="details__block-specs-value">
                {product?.zoom}
              </span>
            </li>
            <li className="details__block-specs-item">
              Cell
              <span className="details__block-specs-value">
                {product?.cell.length && product?.cell.length <= 3
                  ? `${product?.cell.slice(0, 3).join(', ')}`
                  : `${product?.cell.slice(0, 3).join(', ')}...`}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
