import React from "react"
import { order } from "../../interfaces/Order"
import CartProduct from "../CartProduct"
import './OrdersList.scss'

interface Props {
  orders: order[]
}

export const OrdersList: React.FC<Props> = ({orders}) => {
  return (
    <div className="orders-list">
      {orders.map((order) => <CartProduct order={order} />)}
    </div>
  )
}