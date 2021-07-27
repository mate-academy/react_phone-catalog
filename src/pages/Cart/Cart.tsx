import React from "react";
import { useEffect } from "react";
import { getProductsById } from "../../components/api";
// import HorizontalCard from "../../components/HorizontalCard";
import './Cart.scss'
import {Card} from '../../interfaces/Card'
import { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { OrdersList } from "../../components/OrdersList";
import { order } from "../../interfaces/Order";


export interface Props {
  cart?: order[];
}

export const Cart: React.FC<Props> = ({ cart = [] }) => {
  let [products, setProducts] = useState<Card[]>([]);

  useEffect(() => {
    getProductsById(cart.map((order) => order.productId)).then((resp) => setProducts(resp));
  }, [cart])

  const itemsCount = cart.reduce((prev: number, cur: order) => (
    prev + cur.count
  ), 0)

  const totalPrice = cart.reduce((prev: number, cur: order) => (
    prev + ((products ? products.find(({id}) => id === cur.productId)?.price : 0) || 0) * cur.count), 0
  )

  return (
    <div className="Page">
      <BackButton/>
      <h1 className="h1">
        {
          cart.length > 0
          ? 'Cart'
          : 'Your cart is emty right now.'
        }
      </h1>
      <section>
        {cart.length > 0 ?
          <div className="is_flex" style={{justifyItems: 'space-between'}}>
            <OrdersList orders={cart}/>
            <div className="checkout-block">
              <div className="checkout-block_info">
                <div className="h1 checkout-block_price">
                  ${totalPrice}
                </div>
                <div className="text_color_gray small-text">
                  Total for {itemsCount} items
                </div>
              </div>
              <div className="hr" />
              <button className="button is_bottom_in_flex">
                checkout
              </button>
            </div>
          </div>
        : ''}
      </section>
    </div>
  )
}
