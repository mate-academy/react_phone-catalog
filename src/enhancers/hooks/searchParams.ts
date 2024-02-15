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
    const params = new URLSearchParams(this.params);

    prepareParams(params, key, value);
    this.setParams(params);
  }

  multiSet<T extends Value>(entries: [SearchParam, T][]) {
    const params = new URLSearchParams(this.params);

    entries.forEach(([key, value]) => {
      prepareParams(params, key, value);
    });

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

function prepareParams(params: URLSearchParams, key: SearchParam, value: Value) {
  const stringValue = value.toString();

  if (stringValue) {
    params.set(key, stringValue);
  } else {
    params.delete(key);
  }
}
