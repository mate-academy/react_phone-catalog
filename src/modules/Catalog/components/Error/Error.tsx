import classNames from 'classnames';
import styles from './Error.module.scss';

type Props = {
  setKey: React.Dispatch<React.SetStateAction<number>>;
};

export const Error: React.FC<Props> = ({ setKey }) => {
  return (
    <div className={classNames(styles.error)}>
      <h1 className={classNames(styles.error__title)}>Something went wrong</h1>
      <button
        className={classNames(styles.error__reload)}
        onClick={() => setKey(prev => +prev + 1)}
      >
        Reload
      </button>
    </div>
  );
};
