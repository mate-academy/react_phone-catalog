import AppleIphoneXs from '../images/TestForCard/AppleiPhoneXs.png';
import '../style/main.scss';

export const ProductCard = () => {
  return (
    <div className="product product__card">
      <div className="product__photo">
        <img
          className="product__photo--img"
          src={AppleIphoneXs}
          alt="AppleiPhoneXs"
        />
      </div>

      <div className="product__description">
        <p className="product__text--body">
          Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
        </p>

        <div className="product__price">
          <h2 className="product__price--current">$799</h2>
          <h2 className="product__price--discount">$899</h2>
        </div>

        <div className="product__screen">
          <p className="product__screen--name">Screen</p>
          <p className="product__screen--value">5.8” OLED</p>
        </div>

        <div className="product__capacity">
          <p className="product__capacity--name">Capacity</p>
          <p className="product__capacity--value">64 GB</p>
        </div>

        <div className="product__ram">
          <p className="product__ram--name">RAM</p>
          <p className="product__ram--value">4 GB</p>
        </div>

        <div className="product__button">
          <button
            type="button"
            className="product__ram--name"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="product__ram--value"
          >
            4 GB
          </button>
        </div>
      </div>
    </div>
  );
};
