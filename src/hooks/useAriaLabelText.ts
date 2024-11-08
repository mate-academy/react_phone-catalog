import { useTranslation } from 'react-i18next';

export const useAriaLabelText = (isAdded: boolean, category: string) => {
  const { t } = useTranslation();

  return `${isAdded ? t('button.remove') : t('button.addToCart')} ${t('button.ariaLabel')} ${category}`;
};
