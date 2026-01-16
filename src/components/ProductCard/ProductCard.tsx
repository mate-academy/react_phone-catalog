import Product from '../../types/Product';
import Favourites from '/img/icons/favourites_(Heart_Like).svg';
import FavouritesFilled from '/img/icons/Favourites_Filled.svg';

import s from './ProductCard.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../Context/ProductsContext';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    addProdToCart,
    addProdToFavourites,
    isProdInFavourites,
    isProdInCart,
  } = useContext(ProductsContext);

  // const [isInFav, setIsInFav] = useState(
  //   favouritesArr.some(item => {
  //     item.id === product.id;
  //   }),
  // );

  function handleAddToCart() {
    addProdToCart(product);
  }

  function handleAddToFavourites() {
    addProdToFavourites(product);
  }

  // function isInFavourites(): boolean {
  //   return favouritesArr.some(item => {
  //     item.id === product.id ? setIsInFav(true) : setIsInFav(false);
  //   });
  // }

  return (
    <div className={`card ${s.product_card}`}>
      <div className="card_image">
        <figure className="image is-4by3">
          <img className={s.card_img} src={product.image} alt={product.name} />
        </figure>
      </div>
      <div className="card-content p-0">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{product.name}</p>
            <p className="subtitle is-6">${product.price}</p>
          </div>
        </div>

        <div className="content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">Screen {product.screen}</p>
              <p className="subtitle is-6">Capacity {product.capacity}</p>
              <p className="subtitle is-6">RAM {product.ram}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content is-flex is-justify-content-space-between ">
        <button
          className={classNames('button', {
            [`${s.cart_button}`]: !isProdInCart(product),
            [`${s.cart_button__active}`]: isProdInCart(product),
          })}
          type="button"
          onClick={handleAddToCart}
        >
          {isProdInCart(product) ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`button ${s.fav_button}`}
          type="button"
          onClick={handleAddToFavourites}
        >
          <img
            src={isProdInFavourites(product) ? FavouritesFilled : Favourites}
            alt="Favourites"
            width={16}
            height={16}
            className={s.fav_icon}
          />
        </button>
      </div>
    </div>
  );
};
