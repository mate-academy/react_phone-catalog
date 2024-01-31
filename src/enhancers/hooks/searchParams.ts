import { SetURLSearchParams, useSearchParams as useRouterSearchParams } from 'react-router-dom';
import { SearchParam } from '../../definitions/enums/Router';

let searchParams: SearchParamsWithRouter | null = null;

export function useSearchParams() {
  const [routerParams, setRouterParams] = useRouterSearchParams();

  if (!searchParams) {
    searchParams = new SearchParamsWithRouter(setRouterParams, routerParams);
  }

  return searchParams;
}

type Value = string | number;

export class SearchParamsWithRouter {
  private params: URLSearchParams;
  private setParams: SetURLSearchParams;

  constructor(
    setParamsFunction: SetURLSearchParams,
    params?: string | URLSearchParams,
  ) {
    this.params = new URLSearchParams(params);
    this.setParams = setParamsFunction;
  }

  get<T extends string>(key: SearchParam) {
    return this.params.get(key) as T | null;
  }

  has(key: SearchParam) {
    return this.params.has(key);
  }

  set<T extends Value>(key: SearchParam, value: T) {
    const stringValue = value.toString();

    if (stringValue) {
      this.params.set(key, stringValue);
    } else {
      this.params.delete(key);
    }

    this.setParams(this.params);
  }

  delete(key: SearchParam) {
    this.params.delete(key);

    this.setParams(this.params);
  }

  clear() {
    this.params = new URLSearchParams();
    this.setParams(this.params);
  }
}
