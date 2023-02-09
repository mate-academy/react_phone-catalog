import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import { Product } from '../../types/types';
import { Button } from '../Button/Button';
import { LongButton } from '../LongButton/LongButton';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const {
    name, price,
    fullPrice, screen, capacity, ram, image,
  } = product;
  const {
    cartProducts, setCartProducts,
    favProducts, setFavProducts,
    // visibleFavProducts, setVisibleFavProducts,
  } = useContext<any>(CartAndFavContext);

  // const { cartProducts, setCartProducts } = useContext(CartContext);

  const addToCart = async (
    event: any,
  ) => {
    event.preventDefault();
    setIsAddedToCart(true);
    const exists = cartProducts.find((one:any) => {
      if (one.id === product.id) {
        return one.id === product.id;
      }

      return;
    });

    if (exists) {
      return;
    }

    await setCartProducts([...cartProducts, { ...product, count: 1 }]);
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const toggleFav = async () => {
    setIsAddedToFav(!isAddedToFav);
    const exists = favProducts.find((one: any) => {
      if (one.id === product.id) {
        return one.id === product.id;
      }

      return;
    });

    if (exists) {
      console.log('ex');
      setFavProducts(favProducts.filter((one: any) => one.id !== product.id));
      // setVisibleFavProducts(visibleFavProducts.filter((one) => one.id !== product.id));
      // isAddedToFav(false);

      return;
    }

    if (isAddedToFav === true) {
      console.log('am i useful?????---');
      setFavProducts([...favProducts, product]);

      // setVisibleFavProducts([...visibleFavProducts, product]);
      return;
    }

    if (isAddedToFav === false) {
      console.log('goooo');
      setFavProducts([...favProducts, product]);
      // setVisibleFavProducts([...visibleFavProducts, product]);
      // isAddedToFav()
    }
  };

  useEffect(() => {
    localStorage.setItem('favProducts', JSON.stringify(favProducts));
  }, [favProducts]);

  useEffect(() => {
    cartProducts.map((one: any) => {
      if (one.id === product.id) {
        setIsAddedToCart(true);
      }
    });
    favProducts.map((one: any) => {
      if (one.id === product.id) {
        setIsAddedToFav(true);
      }
    });
  }, []);

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
            text={isAddedToCart ? 'Added to cart' : 'Add to cart'}
            onClick={addToCart}
            className={isAddedToCart && 'selected'}
          />
          <Button
            image={isAddedToFav
              ? '/icons/Favourites Filled (Heart Like).svg'
              : '/icons/Favourites.svg'}
            title="favourites"
            onClick={toggleFav}
          />
        </div>

      </div>
    </>
  );
};
