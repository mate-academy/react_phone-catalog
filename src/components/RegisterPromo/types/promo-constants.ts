export const DISCOUNT_PERCENTAGE = 15;

export const PROMO_CONFIG = {
  maxWidth: 'sm:max-w-[550px]',
  timerDelay: 7000,

  colors: {
    paperBg: 'bg-[#dcc4a4] dark:bg-[#2c241a]',
    paperBorder: 'border-[#3d2b1f]/10 dark:border-[#f5f5dc]/10',
    textPrimary: 'text-[#1a1a1a] dark:text-[#f5f5dc]',
    textSecondary: 'text-[#3d2b1f]/80 dark:text-[#dcc4a4]/80',
    circleBg: 'bg-[#3d2b1f] dark:bg-[#1a1a1a]',
    accent: 'text-[#e5a65e]',
    stampBg: 'bg-[#dcc4a4] dark:bg-[#3d2b1f]',
    stampBorder: 'border-[#8b2626] dark:border-[#c04d4d]',
    stampText: 'text-[#8b2626] dark:text-[#c04d4d]',
    button:
      'bg-[#6b211f] hover:bg-[#8b2626] dark:bg-[#8b2626] dark:hover:bg-[#a33333]',
  },
} as const;

export const PROMO_TEXTS = {
  header: 'Не чекайте!',
  subHeader: 'Отримайте максимум від бібліотеки!',
  discountBadge: 'Отримайте -15%',
  discountSubtext: 'на перше замовлення!',
  description:
    'Зареєструйтеся зараз і відкрийте світ ексклюзивних знижок та тисяч книг!',
  buttonText: 'Зареєструватися',
  disclaimer: '*Тільки для нових акаунтів',
} as const;
