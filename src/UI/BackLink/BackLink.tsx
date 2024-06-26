import { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import classNames from 'classnames';
import styles from './BackLink.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  className?: string;
}

const BackLink: FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      className={classNames(styles.backLink, className)}
    >
      <IoIosArrowBack size={16} />
      <p className={styles.linkText}>Back</p>
    </div>
  );
};

export default BackLink;
