import React from "react";

const classNames = require('classnames');

export interface Props {
  id: string;
  isBig?: boolean;
  favorites?: any[];
  addFavoriteProduct?: (id: string) => object;
  deleteFavoriteProduct?: (card: string) => object;
}

export const LikeButton: React.FC<Props> = ({id, isBig, favorites = [], addFavoriteProduct, deleteFavoriteProduct}) => {
  const liked = favorites.some((productId) => productId === id);
  return (
    <button onClick={() => {
      if(addFavoriteProduct && deleteFavoriteProduct) {
        if(!liked) {
          addFavoriteProduct(id)
        } else {
          deleteFavoriteProduct(id)
        }
      }}}
      className={classNames([
        {
          'square-button_size_big': isBig,
          'is-active': liked,
        },
        'square-button',
        'is_relative'
      ])}
    >
      {liked
        ? <i className="heart-icon_filled icon-size_large"/>
        : <i className="heart-icon icon-size_large"/>}
    </button>
  )
}