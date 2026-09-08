import { FC } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import styles from './BackLink.module.scss';
import { Button } from '../Button';

interface Props {
  label?: string;
}

export const BackLink: FC<Props> = ({ label = 'Back' }) => {
  const navigage = useNavigate();

  return (
    <Button
      variant="text"
      className={styles.link}
      onClick={() => navigage(-1)}
      startIcon={<FaAngleLeft size={16} />}
    >
      <span className={styles.linkText}>{label}</span>
    </Button>
  );
};
