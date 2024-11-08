import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Icons } from '@ui/index';

import { scrollToTop } from '@utils/helpers/scrollToTop';

import styles from './FooterButton.module.scss';

export const FooterButton: FC = () => {
  const { t } = useTranslation();
  const localAria = t(`footer.aria.back`);
  const localBack = t(`footer.back`);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={scrollToTop}
      aria-label={localAria}
      title={localBack}
    >
      <span>{localBack}</span>
      <Icons.ArrowUpIcon aria-hidden="true" />
    </button>
  );
};
