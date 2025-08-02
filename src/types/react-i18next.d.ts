import 'react-i18next';
import { TranslationKey } from '../enums/i18n/Keys';

declare module 'react-i18next' {
  interface DefaultResources {
    translation: Record<TranslationKey, string>;
  }
}
