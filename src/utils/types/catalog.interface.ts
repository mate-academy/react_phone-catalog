import { TProduct } from './product.type';

export interface ICatalog {
  text: CatalogTitle;
  products: TProduct[];
  isDropdown?: boolean;
  isPagination?: boolean;
}

export enum CatalogTitle {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
  favourites = 'favourites',
}
