import { useAppState } from '../../Context/AppContext';
import styles from './Close.module.scss';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Close: React.FC<Props> = ({ onClick }) => {
  const { theme } = useAppState();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${styles.close}
        ${theme === 'light' ? styles.closeLight : styles.closeDark}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </button>
  );
};
