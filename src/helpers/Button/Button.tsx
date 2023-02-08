import { useContext } from 'react';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import './Button.scss';

export const Button = ({
  num, image, alt, className, onClick, link, style, spanClass,
}: any) => {
  const {
    cartProducts,
    favProducts,
  } = useContext(CartAndFavContext);

  console.log(image);

  return (
    <a
      onClick={onClick}
      className={`button-link ${className}`}
      href={link}
      // style={style}
    >
      {
        num ? <div>{num}</div>
          : <img className="button-image" src={image} alt={alt} />
      }
      {
        spanClass === 'favourite-amount' && favProducts.length !== 0 && <span className={spanClass}>{favProducts.length}</span>
      }
      {
        spanClass === 'cart-amount' && cartProducts.length !== 0 && <span className={spanClass}>{cartProducts.length}</span>
      }
    </a>
  );
};
