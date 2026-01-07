export const DEFAULT_SORT_BY = 'newest';
export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = '8';

const UNIT_TRANSLATIONS: { [key: string]: { [lang: string]: string } } = {
  GB: { uk: 'ГБ', de: 'GB', fr: 'Go' },
  TB: { uk: 'ТБ', de: 'TB', fr: 'To' },
  MP: { uk: 'Мп', de: 'MP', fr: 'Mpx' }, // Мегапікселі
  inch: { uk: 'дюйм', de: 'Zoll', fr: 'pouce' }, // Для '
  OLED: { uk: 'OLED', de: 'OLED', fr: 'OLED' }, // Залишаємо
  LCD: { uk: 'РКД', de: 'LCD', fr: 'LCD' },
  Digital: { uk: 'Цифровий', de: 'Digital', fr: 'Numérique' },
  Optical: { uk: 'Оптичний', de: 'Optisch', fr: 'Optique' },
  'Space Black': {
    uk: 'Космічний чорний',
    de: 'Space Schwarz',
    fr: 'Noir sidéral',
  },
  'Blue Ocean': {
    uk: 'Блакитний океан',
    de: 'Blauer Ozean',
    fr: 'Océan bleu',
  },
  'Deep Blue': {
    uk: 'Глибокий синій',
    de: 'Tiefblau',
    fr: 'Bleu profond',
  },
  Silver: { uk: 'Сріблястий', de: 'Silber', fr: 'Argent' },
  Orange: { uk: 'Помаранчевий', de: 'Orange', fr: 'Orange' },
  // ... додайте інші кольори та поширені терміни
};

export const translateDynamicValue = (value: string, lang: string): string => {
  if (!value || typeof value !== 'string') {
    return value;
  }

  let translated = value;
  // Проходимося по словнику і замінюємо відповідності

  for (const key in UNIT_TRANSLATIONS) {
    if (UNIT_TRANSLATIONS[key][lang] && translated.includes(key)) {
      // Використовуємо регулярний вираз для точної заміни слова
      // Можливо, потрібно більш складну логіку для одиниць виміру (1TB vs 1 TB)
      const regex = new RegExp(`\\b${key}\\b`, 'gi'); // \b - межа слова

      translated = translated.replace(regex, UNIT_TRANSLATIONS[key][lang]);
    }
  }

  // Додаткова логіка для перекладу тексту в дужках або інших частин
  // Наприклад, "6.1' OLED (Super Retina XDR)" -> "6.1 дюйм OLED (Super Retina XDR)"
  if (translated.includes("'")) {
    translated = translated.replace(
      /'/g,
      `'${UNIT_TRANSLATIONS.inch[lang] || 'inch'}`,
    );
  }

  return translated;
};
