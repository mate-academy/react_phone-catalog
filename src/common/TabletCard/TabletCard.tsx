import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DetailedProductContext } from '../../context/DetailedProductContext';
import { Button } from '../Button/Button';
import { LongButton } from '../LongButton/LongButton';
import './TabletCard.scss';

type Props = {
  product: any,
  products?: any,
};

export const TabletCard: React.FC<Props> = ({ product, products }) => {
  const {
    imageUrl, name, discount, price, screen, capacity, ram,
  } = product;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const { setDetailedProduct } = useContext<any>(DetailedProductContext);

  console.log(setIsAddedToCart, setIsAddedToFav)
  const getDetailedProduct = async () => {
    if (!products) {
      return;
    }

    const newProduct = products.find(
      (one: any) => one.id === product.id,
    );

    if (newProduct) {
      const response = await fetch(
        `api/phones/${newProduct.id}.json`,
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const result = await response.json();

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });

        setDetailedProduct(result);
      }
    }
  };

  return (
    <>
      <div className="product">
        <Link
          to={`/${product.type}s/${product.id}`}
          onClick={getDetailedProduct}
          className="product__link"
        >
          <img
            className="product__image"
            src={imageUrl}
            alt={name}
          />
          <h3 className="product__title body14">{name}</h3>
        </Link>
        <div className="product__prices">
          <h2 className="product__price">
            $
            {discount
              ? price - ((price * discount) / 100)
              : price}
          </h2>
          {!!discount && discount > 0
            && (
              <h2 className="product__old-price">
                $
                {price}
              </h2>
            )}
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
            text={isAddedToCart ? 'Added to cart' : 'Add to cart'}
            className={isAddedToCart ? 'selected' : ''}
            product={product}
          />
          <Button
            image={isAddedToFav
              ? 'icons/Favourites Filled (Heart Like).svg'
              : 'icons/Favourites.svg'}
            product={product}
          />
        </div>

      </div>
    </>
  );
};
