import { Icons } from '../../types/enums/Icons';
import { Item } from '../../types/interface/Item';
import { Icon } from '../Icon';
import './ProductCard.scss';

interface Props {
  item: Item,
}

export const ProductCard: React.FC<Props> = ({ item }) => {
  const baseurl = 'https://raw.githubusercontent.com/dimakrugly/react_phone-catalog/gh-pages/_new/';
  const productImgPath = `${baseurl}${item.image}`;

  return (

    <div className="productCard">
      <img
        src={productImgPath}
        alt="moto"
        className="productCard__image"
      />
      <p className="productCard__title">{`${item.name} (iMT9G2FS/A)`}</p>
      <div className="productCard__price-container">
        <p className="productCard__price">{`$${item.price}`}</p>
        <p className="productCard__price-promo">{`$${item.price}`}</p>
      </div>
      <div className="productCard__divider" />
      <div className="productCard__info-container">
        <div className="productCard__info-left">
          <p className="productCard__info-prop">screen</p>
          <p className="productCard__info-prop">capacity</p>
          <p className="productCard__info-prop">RAM</p>
        </div>
        <div className="productCard__info-right">
          <p className="productCard__info-val">{item.screen}</p>
          <p className="productCard__info-val">{item.capacity}</p>
          <p className="productCard__info-val">{item.ram}</p>
        </div>
      </div>
      <div className="productCard__controls">
        <button
          type="button"
          aria-label="cart"
          className="productCard__cartbtn"
        >
          Add to cart
        </button>
        <button
          type="button"
          aria-label="fav"
          className="productCard__favbtn"
        >
          <Icon icon={Icons.Heart} />
        </button>
      </div>
    </div>
  );
};
