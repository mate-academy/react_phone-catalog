import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { LongButton } from '../LongButton/LongButton';
import './ProductCard.scss';

// import { Button } from '../../../helpers/Button/Button';
// import { LongButton } from '../../../helpers/LongButton/LongButton';

export const ProductCard: React.FC<any> = ({
  product,
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const {
    name, price,
    fullPrice, screen, capacity, ram, image,
  } = product;

  const addToCart = (event: any) => {
    event.preventDefault();
    // if (event.target == event.currentTarget) {
    //   event.stopPropagation();

    // }
    setIsAddedToCart(!isAddedToCart);
    // console.log('added');

    // event.stopPropagation();
  };
  // console.log(pathname, pathname ===`/${product.category}/${product.id}`)

  return (
    <>
      <div className="product">
        <Link
          to={`../${product.category}/${product.id}`}
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          <img
            className="product__image"
            src={`/_new/${image}`}
            // || productImg || `/_new/${image}`}
            alt={name}
          />
          <h3 className="product__title body14">{name}</h3>
        </Link>
        <div className="product__prices">
          <h2 className="product__price">
            $
            {price}
          </h2>
          <h2 className="product__old-price">
            $
            {fullPrice}
          </h2>
        </div>
        <div className="product__info">
          <div className="product__keys body12">
            <p className="product__key">Screen</p>
            <p className="product__key">Capacity</p>
            <p className="product__key">Ram</p>
          </div>
          <div className="product__values body12">
            <p className="product__value">{screen}</p>
            <p className="product__value">{capacity}</p>
            <p className="product__value">{ram}</p>
          </div>
        </div>
        <div className="product__buttons">
          <LongButton
            text="Add to cart"
            onClick={(event:any) => {
              addToCart(event);
            }}
          />
          <Button image="/icons/Favourites.svg" title="favourites" />
        </div>

      </div>
    </>
  );
};
