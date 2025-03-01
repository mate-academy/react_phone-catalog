import { Lang } from '../types/enumLang';

type Dictionary = {
  [key: string]: string;
};

const en: Dictionary = {
  'homePage.title': 'Welcome to Nice Gadgets store!',
  'link.phones': 'Phones',
  'link.tablets': 'Tablets',
  'link.accessories': 'Accessories',
  'link.favourites': 'Favourites',
  'link.cart': 'Cart',
  'link.back': 'Back',
  'header.phones': 'Phones',
  'header.tablets': 'Tablets',
  'header.accessories': 'Accessories',
  'header.theme': 'Cahnge theme',
  'card.screen': 'Screen',
  'card.resolution': 'Resolution',
  'card.processor': 'Processor',
  'card.capacity': 'Capacity',
  'card.memory': 'Built in memory',
  'card.button': 'Add to cart',
  'card.button.added': 'Added',
  'new-models.title': 'Brand new models',
  'categories.title': 'Shop by category',
  'hot-prices.title': 'Hot prices',
  'categories.phones': 'Mobile phones',
  'categories.tablets': 'Tablets',
  'categories.accessories': 'Accessories',
  'categories.models': 'models',
  'sort.new': 'Newest',
  'sort.alpha': 'Alphabetically',
  'sort.alpha-desc': 'Alphabetically(DESC)',
  'sort.exp': 'Expensive',
  'sort.cheap': 'Cheapest',
  'favourite.title': 'Favourites',
  'footer.link.contacts': 'contacts',
  'footer.link.rights': 'rights',
  'footer.button': 'Back to top',
  'not-found.title': 'Page not found',
  'not-found.button': 'Back to home',
  'item.colors': 'Available colors',
  'item.cap': 'Select capacity',
};

const it: Dictionary = {
  'homePage.title': 'Benvenuti nel negozio Nice Gadgets!',
  'link.phones': 'Cellulari',
  'link.tablets': 'Tablet',
  'link.accessories': 'Accessori',
  'link.favourites': 'Preferiti',
  'link.cart': 'Carrello',
  'link.back': 'Indietro',
  'header.phones': 'Cellulari',
  'header.tablets': 'Tablet',
  'header.accessories': 'Accessori',
  'header.theme': 'Cambia tema',
  'card.screen': 'Schermo',
  'card.resolution': 'Risoluzione',
  'card.processor': 'Processore',
  'card.capacity': 'Capacità',
  'card.memory': 'Costruito nella memoria',
  'card.button': 'Aggiungi al carrello',
  'card.button.added': 'Aggiunto',
  'new-models.title': 'Modelli nuovi di zecca',
  'categories.title': 'Acquista per categoria',
  'hot-prices.title': 'Prezzi caldi',
  'categories.phones': 'Cellulari',
  'categories.tablets': 'Tablet',
  'categories.accessories': 'Accessori',
  'categories.models': 'modelli',
  'footer.link.contacts': 'contatti',
  'sort.new': 'Più recenti',
  'sort.alpha': 'Alfabetico',
  'sort.alpha-desc': 'Alfabetico(DESC)',
  'sort.exp': 'Più costosi',
  'sort.cheap': 'Meno costosi',
  'favourite.title': 'Preferiti',
  'footer.link.rights': 'diritti',
  'footer.button': "Torna all'inizio",
  'not-found.title': 'Pagina non trovata',
  'not-found.button': 'Torna alla home',
  'item.colors': 'Colori disponibili',
  'item.cap': 'Seleziona la capacità',
};

const dictionaries = { en, it };

export function translate(key: string, lang = Lang.EN) {
  const dictionary = dictionaries[lang] || en;

  return dictionary[key] || key;
}
