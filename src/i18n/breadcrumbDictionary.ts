export interface BreadcrumbDictionary {
  home: string;
  phones: string;
  tablets: string;
  accessories: string;
  favourites: string;
  cart: string;
}

export const breadcrumbDictionary: Record<'en' | 'ua', BreadcrumbDictionary> = {
  en: {
    home: 'Home',
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favourites: 'Favourites',
    cart: 'Cart',
  },
  ua: {
    home: 'Головна',
    phones: 'Телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
    favourites: 'Список бажань',
    cart: 'Кошик',
  },
};
