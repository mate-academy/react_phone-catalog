import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import { Button } from '../Button/Button';
import { LongButton } from '../LongButton/LongButton';
import './ProductCard.scss';

// import { Button } from '../../../helpers/Button/Button';
// import { LongButton } from '../../../helpers/LongButton/LongButton';

export const ProductCard: React.FC<any> = ({
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
  } = useContext(CartAndFavContext);

  // const { cartProducts, setCartProducts } = useContext(CartContext);

  const addToList = async (
    event: any,
    products,
    setProducts,
    isAdded,
    setIsAdded,
  ) => {
    event.preventDefault();
    const exists = products.find((one) => {
      setIsAdded(true);
      if (one.id === product.id) {
        return one.id === product.id;
      }
    });

    if (exists) {
      return;
    }

    await setProducts([...products, product]);
    console.log(isAdded);
  };

  useEffect(() => {
    console.log(isAddedToCart);
  }, [isAddedToCart]);

  useEffect(() => {
    console.log(isAddedToCart);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    localStorage.setItem('favProducts', JSON.stringify(favProducts));
  }, [cartProducts, favProducts]);

  useEffect(() => {
    console.log(cartProducts, product);
    cartProducts.map((one) => {
      if (one.id === product.id) {
        setIsAddedToCart(true);
      }
    });
    // favProducts.map((one) => {
    //   // if (one.id === product.id) {
    //   //   setFavProducts(true);
    //   // }
    // });
  }, []);

  // const addToFavourites = (event: any) => {
  //   event.preventDefault();
  //   const exists = cartProducts.find((one) => one.id === product.id);

  //   if (!exists) {
  //     setFavProducts([...favProducts, product]);
  //     console.log(favProducts);
  //     localStorage.setItem('favProducts', JSON.stringify(favProducts));
  //     setIsAddedToCart(!isAddedToFav);
  //     const roducts = localStorage.getItem('favProducts');

  //     console.log(roducts);
  //   }
  // };
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
            text={isAddedToCart ? 'Added to cart' : 'Add to cart'}
            onClick={(event: any) => {
              addToList(event,
                cartProducts,
                setCartProducts,
                isAddedToCart,
                setIsAddedToCart);
            }}
            className={isAddedToCart && 'selected'}
          />
          <Button
            image="/icons/Favourites.svg"
            title="favourites"
            onClick={(event: any) => {
              addToList(
                event,
                favProducts,
                setFavProducts,
                isAddedToFav,
                setIsAddedToFav,
              );
            }}
            // className={isAddedToFav && 'favourite'}
          />
        </div>

      </div>
    </>
  );
};
