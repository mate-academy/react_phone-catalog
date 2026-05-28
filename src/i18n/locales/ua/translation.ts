export const ua = {
  productCart: {
    screen: 'Екран',
    capacity: 'Памʼять',
    RAM: 'ОЗП',
    button: 'Додати в кошик',
    buttonSelected: 'Додано',
  },

  HomeTitle: {
    welcome: 'Ласкаво просимо до магазину Nice Gadgets!',
    hotPrice: 'Гарячі пропозиції',
  },

  navigation: {
    home: 'Головна',
    phones: 'Телефони',
    tablets: 'Планшети',
    accessories: 'Аксесуари',
  },
  banners: {
    phone: {
      title: 'Тепер доступно <0/> у нашому магазині!',
      p: 'Будь першим!',
      button: 'Замовити зараз',
    },

    tablets: {
      title: 'Нові планшети вже тут!',
      p: 'Продуктивність без обмежень!',
      button: 'Купити',
    },

    accessories: {
      title: 'Доповни свій комплект!',
      p: 'Усе, що тобі потрібно!',
      button: 'Дивитися більше',
    },
  },
} as const;

export default ua;
