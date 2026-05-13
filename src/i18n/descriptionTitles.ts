import { Locale } from './translations';

/**
 * Section titles inside `description` come from the mate-academy JSON
 * and are only available in English. We translate the most common
 * headings via this lookup; unknown titles fall back to the original.
 * Paragraph copy stays in English (the product data source is English).
 */
const TITLES: Record<string, { ru: string; uk: string }> = {
  'A14 Bionic chip. The only thing even close was our last chip.': {
    ru: 'Чип A14 Bionic. Ближайший аналог — наш предыдущий чип.',
    uk: 'Чип A14 Bionic. Найближчий аналог — наш попередній чип.',
  },
  'A15 Bionic': { ru: 'Чип A15 Bionic', uk: 'Чип A15 Bionic' },
  'A15 Bionic Chip and Neural Engine': {
    ru: 'Чип A15 Bionic и Neural Engine',
    uk: 'Чип A15 Bionic та Neural Engine',
  },
  'A15 Bionic chip. Super power. Mini sized.': {
    ru: 'Чип A15 Bionic. Огромная мощность. Компактный размер.',
    uk: 'Чип A15 Bionic. Велика потужність. Компактний розмір.',
  },
  'Activity tracking': {
    ru: 'Отслеживание активности',
    uk: 'Відстеження активності',
  },
  'Advanced Cameras and Center Stage': {
    ru: 'Продвинутые камеры и Center Stage',
    uk: 'Просунуті камери та Center Stage',
  },
  'Always-On Retina display': {
    ru: 'Дисплей Retina Always-On',
    uk: 'Дисплей Retina Always-On',
  },
  'Amazing Camera. No Pro Required.': {
    ru: 'Потрясающая камера. Профессионалом быть не обязательно.',
    uk: 'Дивовижна камера. Бути профі необов’язково.',
  },
  'And then there was Pro': {
    ru: 'И появилась версия Pro',
    uk: 'А потім з’явилась версія Pro',
  },
  'And then was a Pro': {
    ru: 'И появилась версия Pro',
    uk: 'А потім з’явилась версія Pro',
  },
  'Apple Pencil and Smart Keyboard Support': {
    ru: 'Поддержка Apple Pencil и Smart Keyboard',
    uk: 'Підтримка Apple Pencil та Smart Keyboard',
  },
  'Blast past fast.': {
    ru: 'Быстрее быстрого.',
    uk: 'Швидше за швидке.',
  },
  'Blood oxygen sensor': {
    ru: 'Датчик кислорода в крови',
    uk: 'Датчик кисню в крові',
  },
  Camera: { ru: 'Камера', uk: 'Камера' },
  'Cinematic Mode': {
    ru: 'Кинематографический режим',
    uk: 'Кінематографічний режим',
  },
  'Compact and Portable': {
    ru: 'Компактный и портативный',
    uk: 'Компактний та портативний',
  },
  'Compact and Powerful': {
    ru: 'Компактный и мощный',
    uk: 'Компактний та потужний',
  },
  'ECG app': { ru: 'Приложение ЭКГ', uk: 'Застосунок ЕКГ' },
  'Fall detection': {
    ru: 'Определение падения',
    uk: 'Визначення падіння',
  },
  'Family Setup': {
    ru: 'Семейная настройка',
    uk: 'Сімейне налаштування',
  },
  'Fitness and health tracking': {
    ru: 'Фитнес и контроль здоровья',
    uk: 'Фітнес та контроль здоров’я',
  },
  'Fitness tracking': {
    ru: 'Отслеживание фитнеса',
    uk: 'Відстеження фітнесу',
  },
  'Health and fitness tracking': {
    ru: 'Здоровье и фитнес',
    uk: 'Здоров’я та фітнес',
  },
  'Larger display': { ru: 'Больший дисплей', uk: 'Більший дисплей' },
  'Monitor your health': {
    ru: 'Следите за своим здоровьем',
    uk: 'Стежте за своїм здоров’ям',
  },
  'Night mode comes to all your cameras.': {
    ru: 'Ночной режим теперь во всех камерах.',
    uk: 'Нічний режим тепер у всіх камерах.',
  },
  'Powerful Performance': {
    ru: 'Мощная производительность',
    uk: 'Потужна продуктивність',
  },
  ProMotion: { ru: 'ProMotion', uk: 'ProMotion' },
  'Retina Display and True Tone': {
    ru: 'Дисплей Retina и True Tone',
    uk: 'Дисплей Retina та True Tone',
  },
  'Retina display': { ru: 'Дисплей Retina', uk: 'Дисплей Retina' },
  'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.':
    {
      ru: 'Снимай. Переворачивай. Приближай. Кадрируй. Режь. Подсвечивай. Меняй. Влюбляйся.',
      uk: 'Знімай. Перевертай. Наближай. Кадруй. Ріж. Підсвічуй. Змінюй. Закохуйся.',
    },
  'Stay connected': { ru: 'Всегда на связи', uk: 'Завжди на зв’язку' },
  'Stay connected on the go': {
    ru: 'На связи где угодно',
    uk: 'На зв’язку будь-де',
  },
  'Stream your favorite music': {
    ru: 'Слушайте любимую музыку',
    uk: 'Слухайте улюблену музику',
  },
  'Stunning Liquid Retina Display': {
    ru: 'Потрясающий дисплей Liquid Retina',
    uk: 'Чудовий дисплей Liquid Retina',
  },
  'The Ultimate Pro Camera System': {
    ru: 'Лучшая система камер Pro',
    uk: 'Найкраща система камер Pro',
  },
  'Thin, Light, and Powerful': {
    ru: 'Тонкий, лёгкий, мощный',
    uk: 'Тонкий, легкий, потужний',
  },
  'Track your daily activity': {
    ru: 'Отслеживайте ежедневную активность',
    uk: 'Відстежуйте щоденну активність',
  },
  'Track your workouts': {
    ru: 'Отслеживайте тренировки',
    uk: 'Відстежуйте тренування',
  },
  'Versatile Camera System': {
    ru: 'Универсальная система камер',
    uk: 'Універсальна система камер',
  },
  'Versatile Features and Apple Pencil Support': {
    ru: 'Универсальные возможности и Apple Pencil',
    uk: 'Універсальні можливості та Apple Pencil',
  },
  'Versatile and Affordable': {
    ru: 'Универсальный и доступный',
    uk: 'Універсальний та доступний',
  },
  Wonderfull: { ru: 'Удивительный', uk: 'Дивовижний' },
  'Your new superpower.': {
    ru: 'Ваша новая суперсила.',
    uk: 'Ваша нова суперсила.',
  },
};

export const translateDescriptionTitle = (
  title: string,
  locale: Locale,
): string => {
  if (locale === 'en') return title;
  const entry = TITLES[title.trim()];
  return entry?.[locale] ?? title;
};
