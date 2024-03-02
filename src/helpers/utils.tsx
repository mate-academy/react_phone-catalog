// eslint-disable
// eslint-disable
/* eslint-disable */
import { useSearchParams } from "react-router-dom";
import { Product } from "../types";
import { useContext } from "react";
import { StateContext } from "../AppContext";
import _ from "lodash";

export enum ACTIONS {
  SET_ITEMS_PER_PAGE,
  SET_SEARCH_QUERY,
  SET_FAVOUTITES,
  SET_PRODUCTS,
  ADD_TO_CARD,
  DELETE_FROM_CARD,
  DELETE_FROM_FAVOURITES,
  RENDER_PAGE,
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

export function getAge(a: Product,b: Product) {
  if(a.age < b.age) {
    return -1;
  }
  if(a.age > b.age) {
    return 1;
  }

  return 0;
}

export function getUniqueItems(array: Product[]) {
  const tempUniqueItems: Product[] = [];
  for (let i = 0; i <= array.length - 1; i++) {
    const temp = tempUniqueItems.find(elem => elem.id === array[i].id);
    if (temp === undefined) {
      tempUniqueItems.push(array[i]);
    }
  }

  return tempUniqueItems;
}

export function useDeleteAllSimilar() {
  const { state, dispatch } = useContext(StateContext);

  const copy = _.cloneDeep(state.card);

  return function deleteAllSimilar(phone: Product) {

    while (copy.find(element => element.id === phone.id) !== undefined) {

      copy.forEach((elem) => {

        if (elem.id === phone.id) {
          const index = copy.findIndex(elem => elem.id === phone.id);

          copy.splice(index, 1);
          dispatch({ type: ACTIONS.DELETE_FROM_CARD, payload: phone });
        }
      });

      deleteAllSimilar(phone);
    }
  }
}

export function getPageHeader(page: string = '') {
  let pageHader = '';

  if (page === '/phones') {
    pageHader = 'Mobile phones';
  }
  if (page === '/tablets') {
    pageHader = 'Tablets';
  }
  if (page === '/accessoires') {
    pageHader = 'Accessoires';
  }

  return pageHader;
}
