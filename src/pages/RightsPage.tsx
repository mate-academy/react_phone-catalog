import { useTranslation } from 'react-i18next';
import { TeamMembers } from '../components/TeamMembers';

export const RightsPage = () => {
  const { t } = useTranslation('rightspage');

  return (
    <div className="m-auto text-default text-center text-primary dark:text-dark-primary bg-white dark:bg-dark-background tracking-wide leading-relaxed px-2 py-4">
      <div className="m-10">{t('content')}</div>
      <div className="max-w-6xl mx-auto rounded-2xl shadow-lg border border-elements dark:border-dark-border bg-white dark:bg-dark-background p-4 tablet:p-8">
        <TeamMembers />
      </div>
    </div>
  );
};
