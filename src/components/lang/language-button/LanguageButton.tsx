import { FC } from 'react';

import cn from 'classnames';

import { LanguageIcon } from '../language-icon/LanguageIcon';
import styles from './LanguageButton.module.scss';

type TProps = {
  language: {
    code: string;
    lang: string;
    flag: string;
  };
  currentLanguage: string;
  onChangeLanguage: (code: string, flag: string) => void;
};

export const LanguageButton: FC<TProps> = ({
  language: { code, lang, flag },
  currentLanguage,
  onChangeLanguage,
}) => {
  return (
    <button
      type="button"
      onClick={() => onChangeLanguage(code, flag)}
      className={cn(styles.lang, {
        [styles.selected]: code === currentLanguage,
      })}
      aria-label={lang}
    >
      <LanguageIcon flag={flag} />
      {code.toUpperCase()}
    </button>
  );
};
