import './productInfo.scss';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  details: ProductDetails,
};

export const ProductInfo: React.FC<Props> = ({ details }) => {
  return (
    <section className="product-info">
      <div
        className="product-info__about"
        data-cy="productDescription"
      >
        <h2 className="product-info__title product-info__title-about">
          About
        </h2>
        {details.description.map(({ text, title }) => {
          return (
            <div
              key={title}
              className="product-info__description"
            >
              <h3 className="product-info__description-title">{title}</h3>
              <div className="product-info__description-par">
                {text.map(par => par)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="product-info__tech-specs">
        <h2 className="product-info__title product-info__title-tech">
          Tech specs
        </h2>
        <ul className="product-info__tech-list">
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">Screen</div>
            <div className="product-info__tech-item-value">
              {details.screen}
            </div>
          </li>
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">Resolution</div>
            <div className="product-info__tech-item-value">
              {details.resolution}
            </div>
          </li>
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">Processor</div>
            <div className="product-info__tech-item-value">
              {details.processor}
            </div>
          </li>
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">RAM</div>
            <div className="product-info__tech-item-value">
              {details.ram}
            </div>
          </li>
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">Built in memory</div>
            <div className="product-info__tech-item-value">
              {details.capacity}
            </div>
          </li>
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">Camera</div>
            <div className="product-info__tech-item-value">
              {details.camera}
            </div>
          </li>
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">Zoom</div>
            <div className="product-info__tech-item-value">
              {details.zoom}
            </div>
          </li>
          <li className="product-info__tech-item">
            <div className="product-info__tech-item-title">Cell</div>
            <div className="product-info__tech-item-value">
              {details.cell.join(', ')}
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
