import { Product } from '../../types/Product';
import { getProductDiscount } from '../../utils/getProductDiscount';

import './ProductCard.scss';

const IMG_SIZE = 208;

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    price,
    screen,
    capacity,
    ram,
  } = product;

  const discountPrice = getProductDiscount(product);

  return (
    <article className="ProductCard">
      <div className="ProductCard-ImgContainer">
        <img
          className="ProductCard-Img"
          src={imageUrl}
          alt="ProductCard"
          width={IMG_SIZE}
          height={IMG_SIZE}
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="ProductCard-Content">
        <h2 className="ProductCard-Title">{name}</h2>

        <div className="ProductCard-Prices">
          <span className="ProductCard-DiscountPrice">
            {`$${discountPrice}`}
          </span>

          {discountPrice !== price
            && (
              <span className="ProductCard-Price">
                {`$${price}`}
              </span>
            )}
        </div>

        <hr className="ProductCard-Break" />

        <div className="ProductCard-Specs">
          <div className="ProductCard-Spec">
            <span className="ProductCard-SpecText">Screen</span>
            <span className="ProductCard-SpecValue">{screen}</span>
          </div>

          <div className="ProductCard-Spec">
            <span className="ProductCard-SpecText">Capacity</span>
            <span className="ProductCard-SpecValue">{capacity}</span>
          </div>

          <div className="ProductCard-Spec">
            <span className="ProductCard-SpecText">RAM</span>
            <span className="ProductCard-SpecValue">{ram}</span>
          </div>
        </div>

        <div className="ProductCard-Buttons">
          <button
            className="ProductCard-Button Button"
            type="button"
          >
            Add to cart
          </button>

          <button
            className="ProductCard-Icon Icon Icon_heart"
            type="button"
            aria-label="Heart"
          />
        </div>
      </div>
    </article>
  );
};
