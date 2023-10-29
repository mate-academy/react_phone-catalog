import { Link, useLocation, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { AddToCartBtn } from '../AddToCartBtn';
import { AddToFavorite } from '../AddToFavorite';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { pathname } = useLocation();
  const { productId } = useParams();

  let path: string;

  if (productId) {
    path = `../${product.itemId}`;
  } else {
    path = `${pathname}/${product.itemId}`;
  }

  const {
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <Link to={`${path}`}>
      <div className="product">
        <div
          className="product__container"
          data-cy="cardsContainer"
        >
          <div className="product__image-container">
            <img className="product__image" src={`new/${image}`} alt={image} />
          </div>
          <div className="product__title">
            {name}
          </div>

          <div className="product__price">
            <div className="product__price-with-discount">
              $
              {price}
            </div>
            <div className="product__fullPrice">
              $
              {fullPrice}
            </div>
          </div>

          <div className="product__properties">
            <div className="product__screen">
              <div className="product__screen-text">Screen</div>
              <div className="product__screen-value">{screen}</div>
            </div>

            <div className="product__capacity">
              <div className="product__capacity-text">Capacity</div>
              <div className="product__capacity-value">{capacity}</div>
            </div>

            <div className="product__RAM">
              <div className="product__RAM-text">RAM</div>
              <div className="product__RAM-value">{ram}</div>
            </div>
          </div>

          <div className="product__buttons">
            <div className="product__buttons-cart">
              <AddToCartBtn />
            </div>

            <div className="product__buttons-favorite">
              <AddToFavorite product={product} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
