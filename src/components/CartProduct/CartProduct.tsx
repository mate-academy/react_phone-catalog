import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { order } from "../../interfaces/Order";
import { Card } from "../../interfaces/Card";
import { getProductById } from "../api";
import './CartProduct.scss'

export interface Props {
  order: order;
  addCartProduct?: (id: string) => object;
  deleteCartProduct?: (id: string) => object;
  deleteOneCartProduct?: (id: string) => object;
}

export const CartProduct: React.FC<Props> = ({
  order,
  addCartProduct = () => {},
  deleteCartProduct = () => {},
  deleteOneCartProduct = () => {}
}) => {
  const [card, setCard] = useState({} as Card)

  useEffect(() => {
    getProductById(order.productId).then((res: Card) => setCard(res))
  })

  return(
    <div className="cart-product" key={card?.id}>
      <div className="cart-product__main">
        <div onClick={() => deleteCartProduct(card?.id)}>
          <i className="deleteButton"/>
        </div>
        <Link to={`/${card?.type}s/${card?.id}`}>
          <img alt="" width="100%" className='cart-product__img' src={card?.imageUrl}/>
        </Link>
        <Link className='cart-product__title' to={`/${card?.type}s/${card?.id}`}>
          {card?.name}
        </Link>
      </div>
      <div className="row_gap_10px row_align_center">
        <button className="square-button square-button_size_small"
          disabled={order.count === 1}
          onClick={() => {
            deleteOneCartProduct(order.productId)
          }}
        >
          -
        </button>
        {order.count}
        <button className="square-button square-button_size_small"
          onClick={() => {
            addCartProduct(order.productId)
          }}
        >
          +
        </button>
      </div>
      <div className='price'>
        <span className="h2">${card?.price * order.count} </span>
      </div>
    </div>
  )
}
