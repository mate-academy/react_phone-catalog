import { useTranslation } from 'react-i18next';

import rightsTextEn from './rights.md?raw';
import rightsTextUk from './rights.uk.md?raw';

import { RightsTemplate } from '@/components';

export const RightsPage = () => {
  const { t, i18n } = useTranslation();

  const currentYear = new Date().getFullYear();

  const rightsText =
    i18n.resolvedLanguage?.startsWith('uk') ? rightsTextUk : rightsTextEn;

  const processedText = rightsText.replaceAll(
    '{{year}}',
    currentYear.toString(),
  );

  return (
    <RightsTemplate
      title={t('rightsTitle')}
      text={processedText}
    />
  );
};
