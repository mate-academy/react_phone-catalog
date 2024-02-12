import { SetURLSearchParams, useSearchParams as useRouterSearchParams } from 'react-router-dom';
import { SearchParam } from '../../definitions/enums/Router';

export function useSearchParams() {
  const [routerParams, setRouterParams] = useRouterSearchParams();

  return new SearchParamsWithRouter(setRouterParams, routerParams);
}

type Value = string | number;

export class SearchParamsWithRouter {
  readonly params: URLSearchParams;

  private setParams: SetURLSearchParams;

  constructor(
    setParamsFunction: SetURLSearchParams,
    searchParams: URLSearchParams,
  ) {
    this.params = searchParams;
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
    const params = new URLSearchParams(this.params);

    if (stringValue) {
      params.set(key, stringValue);
    } else {
      params.delete(key);
    }

    this.setParams(params);
  }

  delete(key: SearchParam) {
    const params = new URLSearchParams(this.params);

    params.delete(key);

    this.setParams(params);
  }

  clear() {
    const newParams = new URLSearchParams();

    this.setParams(newParams);
  }
}
