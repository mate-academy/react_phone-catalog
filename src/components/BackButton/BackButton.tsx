import { CSSProperties, FC } from 'react';
import styles from './BackButton.module.scss';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { useNavigate } from 'react-router-dom';

interface Props {
  style?: CSSProperties;
}

export const BackButton: FC<Props> = ({ style }) => {
  const { arrowLeftUrl } = useIconSrc();
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className={styles.goBackButton}
        style={style}
      >
        <img src={arrowLeftUrl} alt="back" className={styles.chevronIcon} />
        <div className={styles.goBackText}>
          <p>Back</p>
        </div>
      </button>
    </>
  );
};
