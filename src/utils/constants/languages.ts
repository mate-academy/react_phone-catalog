import { LOCALS } from '@utils/constants/codeLang';

import en from '../../images/flag/en.svg';
import fr from '../../images/flag/fr.svg';
import uk from '../../images/flag/uk.svg';

export interface ILanguages {
  code: string;
  lang: string;
  flag: string;
}

export const languages: ILanguages[] = [
  { code: LOCALS.EN, lang: 'English', flag: en },
  { code: LOCALS.UK, lang: 'Ukrainian', flag: uk },
  { code: LOCALS.FR, lang: 'French', flag: fr },
];
