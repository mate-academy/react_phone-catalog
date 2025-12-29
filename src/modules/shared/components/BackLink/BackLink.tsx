import { FC } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import styles from './BackLink.module.scss';

interface Props {
  label?: string;
}

export const BackLink: FC<Props> = ({ label = 'Back' }) => {
  const navigage = useNavigate();

  return (
    <button className={styles.link} onClick={() => navigage(-1)}>
      <FaAngleLeft size={16} />
      <span className={styles.linkText}>{label}</span>
    </button>
  );
};
