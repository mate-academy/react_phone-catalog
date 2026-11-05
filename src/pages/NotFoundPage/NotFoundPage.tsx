import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { NotFoundTemplate } from '@/components/templates';

import pageNotFoundImage from '/img/page-not-found.webp';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('pageNotFound')} | NICE GADGETS`;
  }, [t]);

  return (
    <NotFoundTemplate
      title={t('pageNotFound')}
      image={pageNotFoundImage}
    />
  );
};
