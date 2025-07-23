import { TeamMembers } from '../components/TeamMembers';
import { useLanguage } from '../context/language/useLanguage';
import { rightsPageDictionary } from '../i18n/rightsPageDictionary';

export const RightsPage = () => {
  const { currentLanguage } = useLanguage();
  const translations = rightsPageDictionary[currentLanguage];

  return (
    <div className="m-auto text-default text-center text-primary dark:text-dark-primary bg-white dark:bg-dark-background tracking-wide leading-relaxed px-2 py-4">
      <div className="m-10">{translations.content}</div>
      <div className="max-w-6xl mx-auto rounded-2xl shadow-lg border border-elements dark:border-dark-border bg-white dark:bg-dark-background p-4 tablet:p-8">
        <TeamMembers />
      </div>
    </div>
  );
};
