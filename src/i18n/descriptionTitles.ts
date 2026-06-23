import { Locale } from './translations';

/**
 * Section titles inside `description` come from the mate-academy JSON
 * (English only). This dictionary maps every known heading to a
 * natural-sounding RU / UA equivalent — closer to Apple's marketing
 * voice than a literal word-by-word translation. Unknown titles fall
 * back to the original.
 */
const TITLES: Record<string, { ru: string; uk: string }> = {
  'A14 Bionic chip. The only thing even close was our last chip.': {
    ru: 'Чип A14 Bionic. Близок к нему только наш предыдущий чип.',
    uk: 'Чип A14 Bionic. Найближче до нього — наш попередній чип.',
  },
  'A15 Bionic': { ru: 'A15 Bionic', uk: 'A15 Bionic' },
  'A15 Bionic Chip and Neural Engine': {
    ru: 'Чип A15 Bionic и Neural Engine',
    uk: 'Чип A15 Bionic і Neural Engine',
  },
  'A15 Bionic chip. Super power. Mini sized.': {
    ru: 'A15 Bionic. Большая мощь в компактном корпусе.',
    uk: 'A15 Bionic. Велика потужність у компактному корпусі.',
  },
  'Activity tracking': {
    ru: 'Отслеживание активности',
    uk: 'Відстеження активності',
  },
  'Advanced Cameras and Center Stage': {
    ru: 'Продвинутые камеры и Center Stage',
    uk: 'Передові камери та Center Stage',
  },
  'Always-On Retina display': {
    ru: 'Always-On Retina',
    uk: 'Always-On Retina',
  },
  'Amazing Camera. No Pro Required.': {
    ru: 'Великолепная камера. Не обязательно быть Pro.',
    uk: 'Чудова камера. Не обовʼязково бути Pro.',
  },
  'And then there was Pro': {
    ru: 'А потом появился Pro',
    uk: 'А потім зʼявився Pro',
  },
  'And then was a Pro': {
    ru: 'А потом появился Pro',
    uk: 'А потім зʼявився Pro',
  },
  'Apple Pencil and Smart Keyboard Support': {
    ru: 'Поддержка Apple Pencil и Smart Keyboard',
    uk: 'Підтримка Apple Pencil та Smart Keyboard',
  },
  'Blast past fast.': {
    ru: 'Быстрее, чем «быстро».',
    uk: 'Швидше, ніж «швидко».',
  },
  'Blood oxygen sensor': {
    ru: 'Датчик кислорода в крови',
    uk: 'Датчик кисню в крові',
  },
  Camera: { ru: 'Камера', uk: 'Камера' },
  'Cinematic Mode': {
    ru: 'Киноэффект',
    uk: 'Кіноефект',
  },
  'Compact and Portable': {
    ru: 'Компактный и портативный',
    uk: 'Компактний і портативний',
  },
  'Compact and Powerful': {
    ru: 'Компактный и мощный',
    uk: 'Компактний і потужний',
  },
  'ECG app': { ru: 'Приложение ЭКГ', uk: 'Застосунок ЕКГ' },
  'Fall detection': {
    ru: 'Распознавание падения',
    uk: 'Розпізнавання падіння',
  },
  'Family Setup': {
    ru: 'Семейная настройка',
    uk: 'Сімейне налаштування',
  },
  'Fitness and health tracking': {
    ru: 'Фитнес и здоровье',
    uk: 'Фітнес і здоровʼя',
  },
  'Fitness tracking': {
    ru: 'Отслеживание фитнеса',
    uk: 'Відстеження фітнесу',
  },
  'Health and fitness tracking': {
    ru: 'Здоровье и фитнес',
    uk: 'Здоровʼя і фітнес',
  },
  'Larger display': { ru: 'Больший дисплей', uk: 'Більший дисплей' },
  'Monitor your health': {
    ru: 'Заботьтесь о здоровье',
    uk: 'Дбайте про здоровʼя',
  },
  'Night mode comes to all your cameras.': {
    ru: 'Ночной режим — теперь во всех камерах.',
    uk: 'Нічний режим — тепер у всіх камерах.',
  },
  'Powerful Performance': {
    ru: 'Мощная производительность',
    uk: 'Потужна продуктивність',
  },
  ProMotion: { ru: 'ProMotion', uk: 'ProMotion' },
  'Retina Display and True Tone': {
    ru: 'Retina-дисплей и True Tone',
    uk: 'Retina-дисплей і True Tone',
  },
  'Retina display': { ru: 'Retina-дисплей', uk: 'Retina-дисплей' },
  'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.':
    {
      ru: 'Снимай. Меняй ракурс. Зумируй. Кадрируй. Обрезай. Освещай. Доводи. Наслаждайся.',
      uk: 'Знімай. Зміни ракурс. Зумуй. Кадруй. Обрізай. Освітлюй. Доводь. Насолоджуйся.',
    },
  'Stay connected': {
    ru: 'Всегда на связи',
    uk: 'Завжди на звʼязку',
  },
  'Stay connected on the go': {
    ru: 'На связи, где бы ты ни был',
    uk: 'На звʼязку, де б ти не був',
  },
  'Stream your favorite music': {
    ru: 'Любимая музыка — рядом',
    uk: 'Улюблена музика — поруч',
  },
  'Stunning Liquid Retina Display': {
    ru: 'Великолепный Liquid Retina',
    uk: 'Чудовий Liquid Retina',
  },
  'The Ultimate Pro Camera System': {
    ru: 'Лучшая Pro-система камер',
    uk: 'Найкраща Pro-система камер',
  },
  'Thin, Light, and Powerful': {
    ru: 'Тонкий. Лёгкий. Мощный.',
    uk: 'Тонкий. Легкий. Потужний.',
  },
  'Track your daily activity': {
    ru: 'Следи за активностью каждый день',
    uk: 'Стеж за активністю щодня',
  },
  'Track your workouts': {
    ru: 'Записывай тренировки',
    uk: 'Записуй тренування',
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
    uk: 'Універсальний і доступний',
  },
  Wonderfull: { ru: 'Восхитительно', uk: 'Чудово' },
  'Your new superpower.': {
    ru: 'Твоя новая суперсила.',
    uk: 'Твоя нова суперсила.',
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
