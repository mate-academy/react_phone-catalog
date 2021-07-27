import React from 'react'
import { order } from "../../interfaces/Order"

const classNames = require('classnames');

export interface Props {
  isBig?: boolean;
  cart?: order[];
  addCartProduct?: (id: string) => object;
  deleteCartProduct?: (id: string) => object;
  idToAdd: string;
}

export const AddToCartButton: React.FC<Props> = ({ isBig, cart = [], addCartProduct, deleteCartProduct, idToAdd}) => {
  const selected = cart.some(({productId}) => productId === idToAdd);
  return(
    <button
      onClick={() => {
        if(addCartProduct && deleteCartProduct) {
          if(!selected) {
            addCartProduct(idToAdd);
          } else {
            deleteCartProduct(idToAdd)
          }
        }
        console.log(cart)
      }}
      className={
        classNames([
          'button three-in-four',
          {
            'button_size_big': isBig,
            'is-active': selected
          }
        ])
      }
    >
      {selected ? 'Added to cart' : 'Add to cart'}
    </button>
  )
}