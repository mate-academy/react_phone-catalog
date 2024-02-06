import { SetURLSearchParams, useSearchParams as useRouterSearchParams } from 'react-router-dom';
import { SearchParam } from '../../definitions/enums/Router';
import { useRef } from 'react';


export function useSearchParams() {
  const [routerParams, setRouterParams] = useRouterSearchParams();
  const searchParamsRef = useRef(routerParams);
  const setParamsRef = useRef(setRouterParams);
  const searchParams = useRef(new SearchParamsWithRouter(setParamsRef, searchParamsRef));

  searchParamsRef.current = routerParams;
  setParamsRef.current = setRouterParams;

  return searchParams.current;
}

type Value = string | number;

export class SearchParamsWithRouter {
  private params: { current: URLSearchParams };
  private setParams: { current: SetURLSearchParams };

  constructor(
    setParamsFunction: React.MutableRefObject<SetURLSearchParams>,
    searchParams: React.MutableRefObject<URLSearchParams>
  ) {
    this.params = searchParams;
    this.setParams = setParamsFunction;
    // console.log('New SetParamsObject was created');
  }

  get<T extends string>(key: SearchParam) {
    return this.params.current.get(key) as T | null;
  }

  has(key: SearchParam) {
    return this.params.current.has(key);
  }

  set<T extends Value>(key: SearchParam, value: T) {
    const stringValue = value.toString();
    const params = new URLSearchParams(this.params.current);

    if (stringValue) {
      params.set(key, stringValue);
    } else {
      params.delete(key);
    }

    this.setParams.current(params);
  }

  delete(key: SearchParam) {
    const params = new URLSearchParams(this.params.current);
    params.delete(key);

    this.setParams.current(params);
  }

  clear() {
    const newParams = new URLSearchParams();
    this.setParams.current(newParams);
  }
}
