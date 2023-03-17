import { Product } from '../../types/product';
import './card.scss';

type Props = {
  product: Product,
  move: number
};

export const Card:React.FC<Props> = ({ product, move }) => {
  const discount = product.price - ((product.price / 100) * product.discount);

  return (
    <div
      className="container-card"
      style={{ transform: `translate(${move}px)` }}
      data-cy="cardsContainer"
    >
      <img src={`../../${product.imageUrl}`} alt="product" />
      <h2 className="card-title">{product.snippet}</h2>
      <div className="price">
        <span className="price__current">
          $
          {discount}
        </span>
        {
          discount !== product.price && (
            <span className="price__old">
              $
              {product.price}
            </span>
          )
        }
      </div>
      <div className="describe">
        <div className="describe__parametr">
          <span className="category">Screen</span>
          <span className="value">{product.screen}</span>
        </div>
        <div className="describe__parametr">
          <span className="category">Capacity</span>
          <span className="value">
            {
              product.capacity
                ? `${parseInt(product.capacity, 10) / 1000}GB`
                : 'No data'
            }
          </span>
        </div>
        <div className="describe__parametr">
          <span className="category">RAM</span>
          <span className="value">
            {' '}
            {
              product.ram
                ? `${parseInt(product.ram, 10) / 1000}GB`
                : 'No data'
            }

          </span>
        </div>
        <div className="describe__buttons">
          <button type="button" className="card-button">
            Add to cart
          </button>
          <button type="button" className="like-button">
            <img src="../../img/icons/Hearth.png" alt="hearth" />
          </button>
        </div>
      </div>
    </div>
  );
};
