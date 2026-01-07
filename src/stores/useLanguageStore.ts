import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SupportedLanguage = 'en' | 'uk' | 'de' | 'fr';

interface DescriptionBlock {
  title: string;
  text: string[];
}

interface TranslatedDescription {
  namespaceId: string;
  description: DescriptionBlock[];
}

interface LanguageState {
  currentLanguage: SupportedLanguage;
  descriptions: {
    [lang: string]: { [namespaceId: string]: DescriptionBlock[] };
  };
  translations: { [lang: string]: { [key: string]: string } };
  setLanguage: (lang: SupportedLanguage) => void;
  loadDescriptionTranslations: (lang: SupportedLanguage) => Promise<void>;
  loadCommonTranslations: (lang: SupportedLanguage) => Promise<void>;
  t: (key: string) => string;
}

const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      descriptions: {}, // Кеш перекладів за мовою та namespaceId
      translations: {}, // Ініціалізація
      t: key => {
        // Допоміжна функція для отримання перекладу
        const { currentLanguage, translations } = get();

        return (
          translations[currentLanguage]?.[key] || translations.en?.[key] || key
        ); // Повертаємо переклад, або англійський, або сам ключ
      },

      setLanguage: lang => {
        set({ currentLanguage: lang });
        get().loadDescriptionTranslations(lang);
        get().loadCommonTranslations(lang); // <-- Завантажуємо загальні переклади
      },

      loadCommonTranslations: async lang => {
        if (get().translations[lang]) {
          return; // Вже завантажено
        }

        try {
          console.log(`Завантажую загальні переклади для мови: ${lang}`);

          const response = await fetch(`locales/${lang}/common.json`);

          if (!response.ok) {
            throw new Error(
              `Failed to load ${lang} common translations: ${response.statusText}`,
            );
          }

          const data = await response.json();

          set(state => ({
            translations: {
              ...state.translations,
              [lang]: data,
            },
          }));
          console.log(`Загальні переклади для ${lang} успішно завантажені.`);
        } catch (error) {
          console.error(`Error loading ${lang} common translations:`, error);
        }
      },

      loadDescriptionTranslations: async lang => {
        if (lang === 'en' || get().descriptions[lang]) {
          // Якщо це англійська (використовуємо оригінал з phones.json) або вже завантажено
          return;
        }

        try {
          console.log(`Завантажую переклади опису для мови: ${lang}`);
          const response = await fetch(`locales/${lang}/description.json`); // Шлях до вашого файлу перекладу

          if (!response.ok) {
            throw new Error(
              `Failed to load ${lang} descriptions: ${response.statusText}`,
            );
          }

          const data: TranslatedDescription[] = await response.json();
          const translatedMap: { [namespaceId: string]: DescriptionBlock[] } =
            {};

          data.forEach(item => {
            translatedMap[item.namespaceId] = item.description;
          });

          set(state => ({
            descriptions: {
              ...state.descriptions,
              [lang]: translatedMap,
            },
          }));
          console.log(`Переклади опису для ${lang} успішно завантажені.`);
        } catch (error) {
          console.error(`Error loading ${lang} descriptions:`, error);
          // Обробка помилок (можливо, повернутися до англійської або показати повідомлення)
        }
      },
    }),
    {
      name: 'language-store-cache',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        currentLanguage: state.currentLanguage,
        // descriptions: state.descriptions,
        // translations: state.translations,
      }),
    },
  ),
);

export default useLanguageStore;
