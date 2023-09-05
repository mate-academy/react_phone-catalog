import { Phone } from '../Type/Phone';
// import AppleIphoneXs from '../images/TestForCard/AppleiPhoneXs.png';
import '../style/main.scss';
// import '../../public/_new/';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  return (
    <div className="product">
      <div className="product__card">
        <div className="product__photo">
          <img
            className="product__photo--img"
            src="../../public/_new/img/phones/apple-iphone-7/black/00.jpg"
            // src={`../../public/_new/${phone.image}`}
            // src={AppleIphoneXs}
            // {'../img/phones/apple-iphone-7/black/00.jpg'}
            alt={phone.phoneId}
          />
        </div>

        <div className="product__description">
          <p className="product__text--body">
            {/* Apple iPhone Xs 64GB Silver (iMT9G2FS/A) */}
            {phone.name}
          </p>

          <div className="product__price">
            <h2 className="product__price--current">{`$${phone.price}`}</h2>
            <h2 className="product__price--discount">{`$${phone.fullPrice}`}</h2>
          </div>

          <div className="product__screen">
            <p className="product__screen--name">Screen</p>
            <p className="product__screen--value">{phone.screen}</p>
          </div>

          <div className="product__capacity">
            <p className="product__capacity--name">Capacity</p>
            <p className="product__capacity--value">{phone.capacity}</p>
          </div>

          <div className="product__ram">
            <p className="product__ram--name">RAM</p>
            <p className="product__ram--value">{phone.ram}</p>
          </div>

          <div className="product__button">
            <button
              type="button"
              className="product__button--add"
            >
              Add to cart
            </button>
            <button
              type="button"
              aria-label="Mute volume"
              className="product__button--favourites"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
