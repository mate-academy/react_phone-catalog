export enum NoResultsCaseName {
  Default = 'default',
  ProductDoesntExist = 'does not exist',
  EmptyCategory = 'empty category',
  EmptyCart = 'empty cart',
  EmptyFavourites = 'empty favourites',
  NoSearchResults = 'no search results',
  PageNotFound = 'page not found',
}

export interface NoResultsCase {
  name: NoResultsCaseName;
  image: string;
  warningText: string;
  suggestionText: string;
}
