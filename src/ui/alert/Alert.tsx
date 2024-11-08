import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';

import { Icons } from '@ui/index';

import { SeverityType } from '@utils/constants/Alerts';

import styles from './Alert.module.scss';

type TProps = {
  severity: SeverityType;
  name: SeverityType;
  message: string;
  hideAlert: boolean;
  closeAlert: () => void;
};

export const Alert: FC<TProps> = ({
  severity,
  message,
  hideAlert,
  name,
  closeAlert,
}) => {
  const { t } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!hideAlert && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [hideAlert]);

  return (
    <div
      className={cn(styles.alert, styles[name], {
        [styles.hide]: hideAlert,
      })}
      role="alert"
      aria-live="assertive"
    >
      <div>
        <p className={styles.title}>{severity.toUpperCase()}!</p>
        <p>{message}</p>
      </div>
      <button
        type="button"
        onClick={closeAlert}
        className={styles.close}
        aria-label={t('alert.labelText')}
        ref={closeButtonRef}
        tabIndex={0}
      >
        <Icons.CloseIcon />
      </button>
    </div>
  );
};
