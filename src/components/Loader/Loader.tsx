import cn from 'classnames';
import { useLanguage } from '../../context/LanguageContext';

import styles from './Loader.module.scss';

interface LoaderProps {
  compact?: boolean;
  label?: string;
}

export const Loader = ({ compact = false, label }: LoaderProps) => {
  const { t } = useLanguage();

  return (
    <div
      className={cn(styles.wrapper, { [styles.compact]: compact })}
      role="status"
      aria-label={label ?? t('common.loadingProducts')}
    >
      <span className={styles.loader} />
    </div>
  );
};
