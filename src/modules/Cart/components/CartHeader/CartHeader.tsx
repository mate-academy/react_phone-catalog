import { useTranslation } from 'react-i18next';
import { BackButton } from '../../../../shared/UI/Buttons/BackButton';
import { useGoBack } from '../../../shared/hooks/useGoBack';
import styles from './CartHeader.module.scss';

export const CartHeader = () => {
  const { t } = useTranslation();
  const { goBack } = useGoBack();
  return (
    <>
      <BackButton className={styles.backButton} onClick={goBack} />

      <h1 className={styles.title}>{t('cart_page.title')}</h1>
    </>
  );
};
