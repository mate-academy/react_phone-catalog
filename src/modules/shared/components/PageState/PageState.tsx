import styles from './PageState.module.scss';

type Props = {
  type: 'error' | 'empty';
  message: string;
  onReload?: () => void;
};

export const PageState: React.FC<Props> = ({ type, message, onReload }) => {
  const isError = type === 'error';

  return (
    <div className={styles['page-state']}>
      <p className={styles['page-state__title']}>{message}</p>

      {isError && (
        <button
          className={styles['page-state__button']}
          onClick={onReload || (() => window.location.reload())}
        >
          Reload
        </button>
      )}
    </div>
  );
};
