import { useNavigate } from 'react-router-dom';

import { Icon } from '../Icon';
import { useTranslation } from '../../hooks';
import styles from './BackLink.module.scss';

type Props = {
  to?: string;
  label?: string;
};

export const BackLink = ({ to, label }: Props) => {
  const navigate = useNavigate();
  const t = useTranslation();

  const backLabel = label || t.common.back;

  const handleClick = () => {
    if (to) {
      navigate(to);

      return;
    }

    navigate(-1);
  };

  return (
    <button
      className={styles.backLink}
      type="button"
      aria-label={backLabel}
      onClick={handleClick}
    >
      <Icon name="chevronLeft" size={16} />

      {backLabel}
    </button>
  );
};
