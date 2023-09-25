import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../Helpers/Types/Product';
import './ProductCard.scss';
import { useCart } from '../../Helpers/CartContex';
import { useFav } from '../../Helpers/FavContex';

type Props = {
  products: Product[],
};

export const ProductCard: React.FC<Props> = ({ products }) => {
  const { addToCart, setButtonStates, buttonStates } = useCart();
  const { toggleFav, favStates, setFavStates } = useFav();

  useEffect(() => {
    const savedStates = localStorage.getItem('buttonStates');

    if (savedStates !== null) {
      setButtonStates(JSON.parse(savedStates));
    }
  }, []);

  useEffect(() => {
    const savedFavStates = localStorage.getItem('favStates');

    if (savedFavStates) {
      setFavStates(JSON.parse(savedFavStates));
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    const newButtonStates = { ...buttonStates };

    newButtonStates[product.id] = !newButtonStates[product.id];
    setButtonStates(newButtonStates);
    localStorage.setItem('buttonStates', JSON.stringify(newButtonStates));
  };

  const handleAddToFav = (product: Product) => {
    toggleFav(product);

    const newFavState = { ...favStates };

    newFavState[product.id] = !newFavState[product.id];
    setFavStates(newFavState);
    localStorage.setItem('favStates', JSON.stringify(newFavState));
  };

  return (
    <>
      {products.map(product => (
        <div className="home__product" key={product.id}>
          <Link to={`/product/${product.id}`} className="product">
            <img
              className="product__image"
              src={product.imageUrl}
              alt={product.name}
            />

            <div className="product__info">
              <p className="product__name">
                {product.name}
              </p>

              <div className="product__prices">
                {product.discount === 0 ? (
                  <p className="product__discount">
                    $
                    {product.price}
                  </p>
                ) : (
                  <>
                    <p className="product__discount">
                      $
                      {product.price - product.price * (product.discount / 100)}
                    </p>

                    <p className="product__price">
                      $
                      {product.price}
                    </p>
                  </>
                )}
              </div>

              <hr className="product__separator" />

              <div className="product__data">
                <p className="product__data-text">Screen</p>
                <p className="product__data-number">{product.screen}</p>
              </div>

              <div className="product__data">
                <p className="product__data-text">Capacity</p>
                <p className="product__data-number">{product.capacity}</p>
              </div>

              <div className="product__data">
                <p className="product__data-text">RAM</p>
                <p className="product__data-number">{product.ram}</p>
              </div>
            </div>
          </Link>

          <div className="product__buttons">
            <button
              type="button"
              className={buttonStates[product.id]
                ? 'product__button-added' : 'product__button-card'}
              onClick={() => handleAddToCart(product)}
              disabled={buttonStates[product.id]}
            >
              {buttonStates[product.id]
                ? ('Added to cart') : ('Add to cart')}
            </button>

            <button
              data-cy="addToFavorite"
              type="button"
              className="product__button-fav"
              onClick={() => handleAddToFav(product)}
            >
              {favStates[product.id] ? (
                <img src="images/FilledHeart.svg" alt="Favourites" />
              ) : (
                <img src="images/Favourites.svg" alt="Favourites" />
              )}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
