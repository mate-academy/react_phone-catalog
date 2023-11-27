export enum CartAction {
  LOAD = 'load',
  ADD = 'add',
  INCREASE = 'increase',
  DECREASE = 'decrease',
  REMOVE = 'remove',
}

export enum FavoritesAction {
  LOAD = 'load',
  ADD = 'add',
  REMOVE = 'remove',
}

export enum Sort {
  NEWEST = 'age',
  ALPHABET = 'name',
  CHEAPEST = 'price',
}

export enum ItemsOnPage {
  ALL = 'All',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}
