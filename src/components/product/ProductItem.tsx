/* eslint-disable */
import classNames from 'classnames';
import {
  Link,
} from 'react-router-dom';
import './productsItem.scss'
import
React, {
  useContext,
} from "react";
import { StateContext } from '../../AppContext';
import { ACTIONS, getFavourite } from '../../helpers/utils';
import { Product } from '../../types';
import { useDeleteAllSimilar } from '../../helpers/utils';

type Props = {
  product: Product,
}

export const ProductItem: React.FC<Props> = ({ product }) => {

  const { state, dispatch } = useContext(StateContext);

  const deleteAllSimilar = useDeleteAllSimilar();

  const addToFavourites = () => {
    if (!getFavourite(state.favourites, product)) {
      dispatch({ type: ACTIONS.SET_FAVOUTITES, payload: product });
    } else {
      dispatch({ type: ACTIONS.DELETE_FROM_FAVOURITES, payload: product });
    }
  }

  const addToCart = () => {
    const cardData = localStorage.getItem('cart') || '[{}]';
    if (!getFavourite(JSON.parse(cardData), product)) {
      dispatch({ type: ACTIONS.ADD_TO_CARD, payload: product });
    } else {
      deleteAllSimilar(product)
    }
  }

  return (

    <div className="list-item">
      <Link
        to={
          `${product.type === 'phone' ? '/phones' : '/tablets'}/${product.id}`
        }

        className='list-item-title'
      >
        <div className="list-item-image">
          <img src={product.picsArray[0]} />
        </div>
      </Link>

      <div className="list-item-text">

        <div className="list-item-title">
          <p>
            <Link
              to={
                `${product.type === 'phone' ? '/phones' : '/tablets'}/${product.id}`
              }

              className='list-item-title'
            >
              {product.name}
            </Link>

          </p>
        </div>

        <div className="list-item-price pb-8">
          <div style={{ paddingRight: "8px" }}>{product.price}</div>
          <div className="grey done">{product.price}</div>
        </div>

        <div className="list-item-line "></div>

        <div className="character-block pb-8" >
          <div className="character-text grey">Screen</div>
          <div className="character-data">{product.screen.replace('inches', '"') + ' & ' + product.age}</div>
        </div>
        <div className="character-block pb-8">
          <div className="character-text grey">Capacity</div>
          <div className="character-data">{product.capacity}</div>
        </div>
        <div className="character-block pb-16">
          <div className="character-text grey">RAM</div>
          <div className="character-data">{product.ram + "  " + product.type}</div>
        </div>

        <div className="button-block">
          <div
            className={classNames("item-button", {
              "item-button-added": getFavourite(state.card, product),
            })}
            onClick={addToCart}
            data-cy="addToFavorite"
          >
            {getFavourite(state.card, product) ? 'Added to card' : 'Add to card'}
          </div>
          <div onClick={addToFavourites} className="cp heart-square">

            {getFavourite(state.favourites, product) ? (
              <img
                src="./img/icons/red.svg"
                alt="img"
              />
            ) : (
              <img
                src="./img/icons/bigHeart2.svg"
                alt="img"
              />
            )}
          </div>
        </div>

      </div>

    </div>
  )
}
