type Dictionary = {
  [key: string]: string;
};

const en: Dictionary = {
  'header.home': 'Home',
  'header.phones': 'Phones',
  'header.tablets': 'Tablets',
  'header.accessories': 'Accessories',

  'homePage.title': 'Welcome to Nice\nGadgets store!',
  'homePage.newModels': 'Brand new models',
  'homePage.category': 'Shop by category',
  'homePage.hotPrices': 'Hot prices',

  'categories.phones': 'Mobile Phones',
  'categories.tablets': 'Tablets',
  'categories.accessories': 'Accessories',
  'categories.favorites': 'Favorites',
  'categories.cart': 'Cart',

  'byCategory.models_one': 'model',
  'byCategory.models_other': 'models',

  'cart.items_one': 'item',
  'cart.items_other': 'items',
  'cart.total-for': 'Total for',
  'cart.checkout': 'Checkout',
  'cart.checkout-content':
    'Checkout is not implemented yet. Do you want to clear the Cart?',

  'sort.by': 'Sort by',
  'sort.items': 'Items on page',
  'sort.age': 'Newest',
  'sort.title': 'Alphabetically',
  'sort.price': 'Cheapest',
  'items.all': 'All',

  'product.screen': 'Screen',
  'product.processor': `Processor`,
  'product.capacity': 'Capacity',
  'product.ram': 'RAM',
  'product.resolution': 'Resolution',
  'product.built-in-memory': 'Built in memory',
  'product.camera': 'Camera',
  'product.zoom': 'Zoom',
  'product.cell': 'Cell',
  'product.about': 'About',
  'product.specs': 'Tech specs',
  'product.colors': 'Available colors',
  'product.capacities': 'Select capacity',

  'back.button': 'Back',
  'product.also-like': 'You may also like',

  'modal.continue': 'Continue',
  'modal.cancel': 'Cancel',

  'error.message': 'Something went wrong',
  'error.button-message': 'Reload page',
  'not-found.page': 'Page not found',
  'not-found.product': 'Product was not found',
  'not-found.cart': 'Your cart is empty',
  'not-found.favorite': 'Your cart is empty',
  'not-found.query': 'There are no product matching the query',
  'not-found.back-to-home': 'Back to home',

  'footer.github': 'github',
  'footer.contacts': 'contacts',
  'footer.rights': 'rights',
  'footer.back-to-top': 'Back to top',

  'button.add': 'Add to cart',
  'button.remove': 'Remove',
};

const ua: Dictionary = {
  'header.home': 'Дім',
  'header.phones': 'Смартфони',
  'header.tablets': 'Планшети',
  'header.accessories': 'Аксесуари',

  'homePage.title': 'Ласкаво просимо до Nice\nGadgets store!',
  'homePage.newModels': 'Новинки',
  'homePage.category': 'Категорії',
  'homePage.hotPrices': 'Акційні товари',

  'categories.phones': 'Смартфони',
  'categories.tablets': 'Планшети',
  'categories.accessories': 'Аксесуари',
  'categories.favorites': 'Список бажань',
  'categories.cart': 'Кошик',

  'byCategory.models_one': 'товар',
  'byCategory.models_few': 'товари',
  'byCategory.models_many': 'товарів',

  'cart.items_one': 'позицію',
  'cart.items_few': 'позиції',
  'cart.items_many': 'позицій',
  'cart.total-for': 'Разом за',
  'cart.checkout': 'Замовити',
  'cart.checkout-content':
    'Оформлення замовлення ще не реалізовано. Чи хочете ви очистити кошик?',

  'sort.by': 'Сортувати',
  'sort.items': 'Товари на сторінці',
  'sort.age': 'Найновіші',
  'sort.title': 'За алфавітом',
  'sort.price': 'Найдешевші',
  'items.all': 'Всі',

  'product.screen': 'Екран',
  'product.capacity': `Ємність`,
  'product.processor': `Процесор`,
  'product.ram': `ОЗУ`,
  'product.resolution': 'Роздільна здатність екрану',
  'product.built-in-memory': `Вбудована пам'ять`,
  'product.camera': 'Камера',
  'product.zoom': 'Zoom',
  'product.cell': 'Cell',
  'product.about': 'Опис',
  'product.specs': 'Характеристики',
  'product.colors': 'Доступні кольори',
  'product.capacities': 'Виберіть ємність',

  'back.button': 'Назад',
  'product.also-like': 'Вам також може сподобатися',

  'modal.continue': 'Підтвердити',
  'modal.cancel': 'Закрити',

  'error.message': 'Щось пішло не так',
  'error.button-message': 'Перезавантажити сторінку',
  'not-found.page': 'Сторінку не знайдено',
  'not-found.product': 'Товар не знайдено',
  'not-found.cart': 'У кошику порожньо',
  'not-found.favorite': 'У вас немає товарів у списку бажань',
  'not-found.query': 'Немає товарів, що відповідають запиту',
  'not-found.back-to-home': 'На головну',

  'footer.github': 'github',
  'footer.contacts': 'Контакти',
  'footer.rights': 'Права',
  'footer.back-to-top': 'Вгору',

  'button.add': 'Купити',
  'button.remove': 'Прибрати',
};

export const dictionaries = { en, ua };
