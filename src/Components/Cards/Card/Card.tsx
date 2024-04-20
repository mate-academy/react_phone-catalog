import React, { useContext } from 'react';
import './Card.scss';
import classNames from 'classnames';
import { Products } from '../../../type/Products';
import { Context } from '../../../Store/Store';

interface Props {
  product: Products;
  discount?: boolean;
}

export const Card: React.FC<Props> = ({ product, discount }) => {
  // const [isFavorite, setIsFavorite] = useState(false);
  const { products, favorite, setFavorite } = useContext(Context);

  // const toggleFavorite = () => {
  //   setIsFavorite(prevState => !prevState);
  // };

  const HanderAddFavorite = () => {
    const isFavorite = favorite.some(fav => fav.id === product.id);

    if (isFavorite) {
      const updatedFavorites = favorite.filter(fav => fav.id !== product.id);

      setFavorite(updatedFavorites);
    } else {
      const productToAdd = products.find(prod => prod.id === product.id);

      if (productToAdd) {
        setFavorite(prevFavorites => [...prevFavorites, productToAdd]);
      }
    }
  };

  const inFavorite = () => {
    return favorite.some(fav => {
      return fav.id === product.id;
    });
  };

  // useEffect(() => {
  //   // console.log('FAVORITE', favorite);
  // }, [favorite]);

  return (
    <div className="container-card">
      <div className="card-image">
        <img
          className="img-normaliz"
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${product.image}`}
          alt="#"
        />
      </div>
      <div className="full">
        <h2 className="product-name">{product.name}</h2>

        {discount ? (
          <div className="product-price">
            <h2 className="product-price-full">{`$${product.price}`}</h2>
            <h2 className="product-price-discount">{`$${product.fullPrice}`}</h2>
          </div>
        ) : (
          <div className="product-price">
            <h2 className="product-price-full">{`$${product.fullPrice}`}</h2>
          </div>
        )}
        <div className="info-container">
          <div className="info-screen">
            <p className="info-name">Screen</p>
            <p className="info-option">{product.screen}</p>
          </div>
          <div className="info-capacity">
            <p className="info-name">Capacity</p>
            <p className="info-option">{product.capacity}</p>
          </div>
          <div className="info-ram">
            <p className="info-name">RAM</p>
            <p className="info-option">{product.ram}</p>
          </div>
        </div>
        <div className="buttons">
          <button className="button is-add">Add to card</button>
          <button
            className={classNames('button', 'is-favorite', 'fa-heart', {
              'fa-regular': !inFavorite(),
              'fa-solid': inFavorite(),
            })}
            onClick={HanderAddFavorite}
          ></button>
        </div>
      </div>
    </div>
  );
};

// fa-regular fa-solid fa-heart серце заповнен і пусте
