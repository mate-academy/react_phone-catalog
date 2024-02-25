/* eslint-disable */
import classNames from 'classnames';
import {
  Link, useLocation,
} from 'react-router-dom';
import './productsItem.scss'
import React, { useContext,
  // useState,
  // useEffect
} from "react";
import { StateContext } from '../../AppContext';
import { ACTIONS, getFavourite } from '../../helpers/utils';
import { Product } from '../../types';

export interface Phone {
  id: number,
  picsArray: string[],
  picsArray2?: string[],
  picsArray3?: string[],
  picsArray4?: string[],
  name: string,
  priceFull: string,
  priceDiscount: string,
  description1: string,
  description2: string,
  description3: string,
  textAbout: string,
  tehcSpecs: string,
  like?: boolean,
  addedToCart?: boolean,
}

type Props = {
  product: Product,
  productType?: string,
}

export const ProductItem: React.FC<Props> = ({ product }) => {

  const { state, dispatch } = useContext(StateContext);
  const location = useLocation();
  console.log(location.pathname.split('/')[1], 'product item location');
  console.log(location.state, 'state');
  // const [pathState, _setPathState] = useState(location.pathname.split('/')[1]);


  const addToFavourites = () => {
    if(!getFavourite(state.favourites, product)) {
      dispatch({ type: ACTIONS.SET_FAVOUTITES, payload: product });
    } else {
      dispatch({ type: ACTIONS.DELETE_FROM_FAVOURITES, payload: product });
    }
  }

  const addToCart = () => {
    if(!getFavourite(state.card, product)) {
      dispatch({ type: ACTIONS.ADD_TO_CARD, payload: product });
    } else {
      dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: product });
    }
  }

  // const path = location.state;


  return (

    <div className="list-item">

      <div className="list-item-image">
        <img src={product.picsArray[0]} />
      </div>

      <div className="list-item-text">

        <div className="list-item-title">
          <p>
            <Link
              to={
                `${product.type === 'phone' ? '/phones' : '/tablets'}/${product.id}`
              }
              // to={
              //   `${location.state === null ? location.pathname : location.pathname.split('/')[1]}/${product.id}`
              // }
              state={{  }}
              // replace={true}
              // relative="path"
              // state={{ some: "value" }}
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
          >
            Add to cart
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
