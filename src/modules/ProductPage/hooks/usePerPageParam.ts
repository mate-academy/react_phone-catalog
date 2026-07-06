import { useTranslation } from 'react-i18next';
import { useUrlParam } from './useUrlParam';

export function usePerPageParam() {
  const { t } = useTranslation('productPage');

  const perPageOptions = [
    { param: '4', label: '4' },
    { param: '8', label: '8' },
    { param: '16', label: '16' },
    { param: 'all', label: t('all') },
  ];

  const { value: perPage, setValue: setPerPage } = useUrlParam<string>(
    'perPage',
    'all',
    true,
  );

  return {
    perPage,
    perPageOptions,
    setPerPage,
  };
}
