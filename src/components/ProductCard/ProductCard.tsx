import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

interface Props {
  item: Product;
}

export const ProductCard: React.FC<Props> = ({ item }) => (
  <div className="product-card">
    <Link to={`/phones/${item.itemId}`} className="product-card__imgs">
      <picture>
        <img
          className="product-card__img"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
      </picture>
    </Link>

    <div className="product-card__cont">
      <Link to={`/phones/${item.itemId}`} className="text product-card__name">
        {item.name}
      </Link>

      <div className="product-card__prices">
        <h2 className="h2 product-card__price">{item.price}</h2>
        <h2 className="h2 product-card__price product-card__price--old">
          {item.fullPrice}
        </h2>
      </div>

      <div className="text text--size-2 product-card__infos">
        <div className="product-card__info">
          <p className="product-card__label">Screen</p>
          <p>{item.screen}</p>
        </div>
        <div className="product-card__info">
          <p className="product-card__label">Capacity</p>
          <p>{item.capacity}</p>
        </div>
        <div className="product-card__info">
          <p className="product-card__label">RAM</p>
          <p>{item.ram}</p>
        </div>
      </div>

      <div className="product-card__btns">
        <button type="button" className="btn">
          Add to cart
        </button>
        <button type="button" className="like-btn">
          <img
            className="like-btn__icon"
            src="./img/like.svg"
            alt="like-btn"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  </div>
);
