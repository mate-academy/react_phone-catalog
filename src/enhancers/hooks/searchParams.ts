import { SetURLSearchParams, useSearchParams as useRouterSearchParams } from 'react-router-dom';
import { SearchParam } from '../../definitions/enums/Router';

const searchParams = {
  current: new URLSearchParams(),
};

export function useSearchParams() {
  const [routerParams, setRouterParams] = useRouterSearchParams();

  searchParams.current = routerParams;

  return new SearchParamsWithRouter(setRouterParams);
}

type Value = string | number;

export class SearchParamsWithRouter {
  private params: { current: URLSearchParams };
  private setParams: SetURLSearchParams;

  constructor(setParamsFunction: SetURLSearchParams) {
    this.params = searchParams;

    this.setParams = setParamsFunction;
  }

  get<T extends string>(key: SearchParam) {
    return this.params.current.get(key) as T | null;
  }

  has(key: SearchParam) {
    return this.params.current.has(key);
  }

  set<T extends Value>(key: SearchParam, value: T) {
    const stringValue = value.toString();

    if (stringValue) {
      this.params.current.set(key, stringValue);
    } else {
      this.params.current.delete(key);
    }

    this.setParams(this.params.current);
  }

  delete(key: SearchParam) {
    this.params.current.delete(key);

    this.setParams(this.params.current);
  }

  clear() {
    this.params.current = new URLSearchParams();
    this.setParams(this.params.current);
  }
}
