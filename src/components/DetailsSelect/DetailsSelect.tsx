import { ProductDetail } from '../../pages/ProductDetails/ProductDetails';
import { DetailsSelectColor } from '../DetailsSelectColor';
import { DetailsSelectCapacity } from '../DetailsSelectCapacity';
import { ActionButtons } from '../ActionButtons';

import './DetailsSelect.scss';

interface Props {
  product: ProductDetail;
  category: ProductDetail[];
}

export const DetailsSelect: React.FC<Props> = ({ product, category }) => {
  const findModels = category.filter(
    model => model.namespaceId === product.namespaceId,
  );

  return (
    <article className="details-select">
      <DetailsSelectColor product={product} products={findModels} />

      <DetailsSelectCapacity product={product} products={findModels} />

      <div
        className="product-card-price
              product-card-price--margin-bottom"
      >
        <strong className="product-card-price__current">
          ${product.priceDiscount}
        </strong>
        <div className="product-card-price__old">${product.priceRegular}</div>
      </div>

      <ActionButtons id={product.id} price={product.priceDiscount} />

      <div className="product-card-info product-card-info--margin">
        <div className="product-card-info-box">
          <div className="product-card-info-box__name">Screen:</div>
          <div className="product-card-info-box__ch">{product.screen}</div>
        </div>
        <div className="product-card-info-box">
          <div className="product-card-info-box__name">Resolution:</div>
          <div className="product-card-info-box__ch">{product.resolution}</div>
        </div>
        <div className="product-card-info-box">
          <div className="product-card-info-box__name">Processor:</div>
          <div className="product-card-info-box__ch">{product.processor}</div>
        </div>
        <div className="product-card-info-box">
          <div className="product-card-info-box__name">Ram:</div>
          <div className="product-card-info-box__ch">{product.ram}</div>
        </div>
      </div>
    </article>
  );
};
