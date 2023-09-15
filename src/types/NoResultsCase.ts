export enum NoResultsCaseName {
  Default = 'default',
  ProductDoesntExist = 'does not exist',
  EmptyCategory = 'empty category',
  EmptyCart = 'empty cart',
  EmptyFavourites = 'empty favourites',
  PageNotFound = 'page not found',
}

export interface NoResultsCase {
  name: NoResultsCaseName;
  image: string;
  warningText: string;
  suggestionText: string;
}
