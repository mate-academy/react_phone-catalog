module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    // Вимикаємо конфлікти специфічності (прибере помилки в BurgerMenu, Footer, Pagination, ProductsSlider, CartPage)
    'no-descending-specificity': null,
    
    // Дозволяємо camelCase для анімацій (прибере помилки в Modal та ProductDetailsPage)
    'keyframes-name-pattern': null,
    
    // Дозволяємо писати властивості в один рядок (прибере помилки в Modal)
    'declaration-block-single-line-max-declarations': null,
    
    // Дозволяємо використання ID селекторів, наприклад #root (прибере помилку в globals.scss)
    'selector-max-id': null
  }
};
