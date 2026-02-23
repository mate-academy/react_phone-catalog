export const routes = {
  home: '/',

  catalog: '/catalog/:category',
  phones: '/catalog/phones',
  tablets: '/catalog/tablets',
  accessories: '/catalog/accessories',

  product: '/product/:category/:id',

  cart: '/cart',
  favorites: '/favorites',

  github: '/github',
  contacts: '/contacts',
  rights: '/rights',

  notFound: '*',
};
