// eslint-disable
// eslint-disable
/* eslint-disable */
import { useSearchParams } from "react-router-dom";
import { Product } from "../types";

export enum ACTIONS {
  SET_ITEMS_PER_PAGE,
  SET_SEARCH_QUERY,
  SET_FAVOUTITES,
  SET_PRODUCTS,
  ADD_TO_CARD,
  DELETE_FROM_CARD,
  DELETE_FROM_FAVOURITES,
}

export function setCurrentPage(page: number) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  params.set('page', String(page));
  setSearchParams(params);
}

export function getFavourite(array: Product[], item: Product) {
  const result = array.find(elem => elem.id === item.id)

  if (result === undefined) {
    return false;
  }
  return true;
}

export function getCurrentItems(array: Product[], currentPage: string, itemsPerpage: number = 4) {
  const lastIndex = +(currentPage) * +(itemsPerpage);
  const firstIndex = lastIndex - +(itemsPerpage);
  const currentItems = array.slice(firstIndex, lastIndex);
  return currentItems;
}

export function useSetCurrentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return function setP(page: number, parameter: string) {
    params.set(parameter, String(page));
    setSearchParams(params);
  }
}
