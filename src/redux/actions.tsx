import {
  ADD_BREADCRUMB_ROUTE,
  ADD_CART_PRODUCT,
  ADD_FAVORITE_PRODUCT,
  DELETE_BREADCRUMB_ROUTE,
  DELETE_CART_PRODUCT,
  DELETE_FAVORITE_PRODUCT,
  DELETE_ONE_CART_PRODUCT,
} from "./types";

import { BreadcrumbRoute } from '../interfaces/BreadcrumbRoute'

export const addCartProduct = (id: string) => {
  return {
    type: ADD_CART_PRODUCT,
    payload: id
  }
}

export const addBreadcrumbRoute = (route: BreadcrumbRoute) => {
  return {
    type: ADD_BREADCRUMB_ROUTE,
    payload: route
  }
}

export const deleteBreadcrumbRoute = (route: BreadcrumbRoute) => {
  return {
    type: DELETE_BREADCRUMB_ROUTE,
    payload: route
  }
}


export const deleteCartProduct = (id: string) => {
  return {
    type: DELETE_CART_PRODUCT,
    payload: id
  }
}

export const deleteOneCartProduct = (id: string) => {
  return {
    type: DELETE_ONE_CART_PRODUCT,
    payload: id
  }
}

export const deleteFavoriteProduct = (id: string) => {
  return {
    type: DELETE_FAVORITE_PRODUCT,
    payload: id
  }
}

export const addFavoriteProduct = (id: string) => {
  return {
    type: ADD_FAVORITE_PRODUCT,
    payload: id,
  }
}
