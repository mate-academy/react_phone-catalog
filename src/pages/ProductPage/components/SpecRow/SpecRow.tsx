//styles
import styles from './SpecRow.module.scss';

//services
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  value?: string;
  variant?: 'primary' | 'secondary';
};

export const SpecRow: React.FC<Props> = ({
  children,
  value,
  variant = 'primary',
}) => {
  return (
    <>
      {value && (
        <div
          className={classNames(styles.specRow, styles[`specRow--${variant}`])}
        >
          <span className={styles.specLabel}>{children}</span>
          <span className={styles.specValue}>{value}</span>
        </div>
      )}
    </>
  );
};
