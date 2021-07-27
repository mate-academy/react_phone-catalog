import { ADD_CART_PRODUCT, DELETE_CART_PRODUCT, DELETE_ONE_CART_PRODUCT } from "./types"
import {actionType} from './rootReducer'
import { order } from "../interfaces/Order"

const initialState = {
  cart: (JSON.parse(localStorage.getItem('cart') || '[]') || []),
}


export const cartReducer = (state = initialState, action: actionType) => {
  let newCart
  switch(action.type) {
    case ADD_CART_PRODUCT:
      newCart = state.cart.some(({productId}: order) => productId === action.payload)
      ? state.cart.map((order: order) => {
        if(order.productId === action.payload) {
          return {
            ...order,
            count: order.count + 1
          }
        }
        return {
          ...order,
        }
      })
      : [
        {
          productId: action.payload,
          count: 1
        },
        ...state.cart,
      ]
      localStorage.setItem('cart', JSON.stringify(newCart))
      return {
        ...state,
        cart: newCart
      }
    case DELETE_ONE_CART_PRODUCT:
      newCart = [...state.cart].map((order) => {
        if (order.productId === action.payload) {
          if(order.count > 1) {
            return ({
              productId: order.productId,
              count: order.count - 1
            })
          }
          return null
        }
        return order
      }).filter((order) => order !== null);
      localStorage.setItem('cart', JSON.stringify(newCart))
      return {
        cart: newCart
      }
    case DELETE_CART_PRODUCT:
      newCart = [...state.cart].filter(({productId}: order) => productId !== action.payload)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return {
        cart: newCart
      }
  }
  return state
}