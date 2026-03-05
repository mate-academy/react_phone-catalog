export type EmptyStateVariant = 'favourites' | 'cart' | 'search';

export interface FavouritesEmptyProps {
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: EmptyStateVariant;
  showSuggestions?: boolean;
  itemCount?: number;
  isLoading?: boolean;
}
