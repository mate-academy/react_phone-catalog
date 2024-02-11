import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/product';
import './ProductCart.scss';
import { MyButton } from '../UI/MyButton';

type Props = {
  product: Product;
};

export const ProductCart: React.FC<Props> = ({ product }) => {
  const {
    id,
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('favoriteProducts');

    if (data) {
      const isFavorite = JSON.parse(data).includes(id);

      setFavorite(isFavorite);
    }
  }, [id]);

  const preparedImgUrl = useMemo(() => {
    return imageUrl.split('/').slice(-1);
  }, [imageUrl]);

  const priceWithDiscount = useMemo(() => {
    return price - ((price * discount) / 100);
  }, [price, discount]);

  const preparedCapacity = useMemo(() => {
    return `${capacity.slice(0, -2)} ${capacity.slice(-2)}`;
  }, [capacity]);

  const preparedRam = useMemo(() => {
    return `${ram.slice(0, -2)} ${ram.slice(-2)}`;
  }, [ram]);

  function handleSetFavorite() {
    const data = localStorage.getItem('favoriteProducts');

    if (data === null) {
      return;
    }

    try {
      const favoriteProducts = JSON.parse(data);

      if (!favorite) {
        favoriteProducts.push(id);
      } else {
        const index = favoriteProducts.indexOf(id);

        favoriteProducts.splice(index, 1);
      }

      localStorage
        .setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    } catch (err) {
      localStorage.removeItem('favoriteProducts');
    }

    setFavorite(current => !current);
  }

  return (
    <article
      className="ProductCart"
      data-cy="cardsContainer"
    >
      <div className="ProductCart__imgbox">
        <img
          src={`img/products/${preparedImgUrl}`}
          alt={name}
          className="ProductCart__img"
        />
      </div>

      <p className="ProductCart__title">{name}</p>

      <div className="ProductCart__pricebox">
        <h2>{`$${priceWithDiscount}`}</h2>

        <h2 className="ProductCart__price">{`$${price}`}</h2>
      </div>

      <ul className="ProductCart__options">
        <li className="ProductCart__option-item">
          <p className="ProductCart__option-name">Screen</p>
          <p className="ProductCart__option-value">{screen}</p>
        </li>
        <li className="ProductCart__option-item">
          <p className="ProductCart__option-name">Capacity</p>
          <p className="ProductCart__option-value">{preparedCapacity}</p>
        </li>
        <li className="ProductCart__option-item">
          <p className="ProductCart__option-name">RAM</p>
          <p className="ProductCart__option-value">{preparedRam}</p>
        </li>
      </ul>

      <div className="ProductCart__btnbox">
        <MyButton>Add to cart</MyButton>
        <button
          type="button"
          className="ProductCart__favorite"
          onClick={handleSetFavorite}
        >
          {favorite
            ? <img src="img/icons/heart-red.svg" alt="favorite product" />
            : <img src="img/icons/heart.svg" alt="favorite product" />}
        </button>
      </div>
    </article>
  );
};
