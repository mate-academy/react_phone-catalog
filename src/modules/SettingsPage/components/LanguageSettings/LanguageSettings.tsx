import classNames from 'classnames';
import { Dropdown } from '../../../shared/components/Dropdown';
import styles from './LanguageSettings.module.scss';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { Language } from '../../../shared/types/enums';

enum LanguageOption {
  English = 'English',
  Polish = 'Polski',
}

type Props = {
  className?: string;
};

const mapLanguageToOption = (language: Language): LanguageOption => {
  const foundKey = Object.keys(Language).find(
    key => Language[key as keyof typeof Language] === language,
  );

  const result = foundKey
    ? LanguageOption[foundKey as keyof typeof LanguageOption]
    : undefined;

  if (!result) {
    throw new Error('Language and LanguageOption enums are not compatible!!!');
  }

  return result;
};

const mapOptionToLanguage = (option: LanguageOption): Language => {
  const foundKey = Object.keys(LanguageOption).find(
    key => LanguageOption[key as keyof typeof LanguageOption] === option,
  );

  const result = foundKey
    ? Language[foundKey as keyof typeof Language]
    : undefined;

  if (!result) {
    throw new Error('Language and LanguageOption enums are not compatible!!!');
  }

  return result;
};

export const LanguageSettings: React.FC<Props> = ({ className }) => {
  const { localeTexts, language, handleLanguageChange } = useLanguage();
  const { languageSettingsTitle, languageSettingsLabel } = localeTexts;

  const handleDropdownValueChange = (newLanguage: string) => {
    if (Object.values(LanguageOption).includes(newLanguage as LanguageOption)) {
      handleLanguageChange(mapOptionToLanguage(newLanguage as LanguageOption));
    } else {
      throw new Error('Language is not valid!!!');
    }
  };

  return (
    <section className={classNames(styles.LanguageSettings, className)}>
      <h2 className={styles.Title}>{languageSettingsTitle}</h2>

      <Dropdown
        title={languageSettingsLabel}
        options={Object.values(Language).map(languageToMap =>
          mapLanguageToOption(languageToMap),
        )}
        chosenOption={mapLanguageToOption(language)}
        onChange={handleDropdownValueChange}
        className={styles.Dropdown}
      />
    </section>
  );
};
