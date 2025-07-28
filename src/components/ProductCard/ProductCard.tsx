import './ProductCard.scss';
import '../../types/Phone';

type Props = {
  key: string;
  image: string;
  name: string;
  priceRegular: number;
  priceDiscount: number | undefined;
  screen: string;
  capacity: string;
  ram: string;
};

export const ProductCard: React.FC<Props> = ({
  key,
  image,
  name,
  priceRegular,
  priceDiscount,
  screen,
  capacity,
  ram,
}) => {
  return (
    <div className="phone" key={key}>
      <div className="phone__photo">
        <img src={image} alt="photo" className="phone__photo--img" />
      </div>
      <div className="phone__name">{name}</div>
      <div className="phone__prices">
        <div className="phone__prices--price">{`$ ${priceRegular}`}</div>
        {priceDiscount && (
          <div className="phone__prices--discount">{`$ ${priceDiscount}`}</div>
        )}
      </div>
      <div className="phone__line"></div>
      <div className="phone__info">
        <div className="phone__info--title">Screen</div>
        <div className="phone__info--value">{screen}</div>
      </div>
      <div className="phone__info">
        <div className="phone__info--title">Capacity</div>
        <div className="phone__info--value">{capacity}</div>
      </div>
      <div className="phone__info">
        <div className="phone__info--title">RAM</div>
        <div className="phone__info--value">{ram}</div>
      </div>
      <div className="phone__buttons">
        <button className="phone__buttons--add">Add to cart</button>
        <button className="phone__buttons--favourites">
          <img src="./public/img/heart.png" alt="favourites" />
        </button>
      </div>
    </div>
  );
};
