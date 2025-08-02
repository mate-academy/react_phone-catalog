import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Language } from '../../../../enums/Language';
import { setLanguage } from '../../../../features/i18nSlice';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import styles from './LanguageSwitcher.module.scss';

const langMap = [Language.EN, Language.UA];

type Props = {
  className?: string;
};

export const LanguageSwitcher: React.FC<Props> = ({ className }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleLanguageChange = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div className={classNames(styles.lang_switcher, className)}>
      {langMap.map((lang, index, arr) => (
        <React.Fragment key={lang}>
          <Button
            onClick={() => handleLanguageChange(lang)}
            className={classNames(styles.lang_switcher__option, {
              [styles['lang_switcher__option--active']]: i18n.language === lang,
            })}
          >
            <Typography
              variant="uppercase"
              color={i18n.language === lang ? 'primary' : 'secondary'}
              className={styles.lang_switcher__language}
            >
              {lang}
            </Typography>
          </Button>
          {index < arr.length - 1 && (
            <Typography variant="uppercase">/</Typography>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
