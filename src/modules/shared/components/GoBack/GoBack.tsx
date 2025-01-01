import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './GoBack.module.scss';
import { IoIosArrowBack } from "react-icons/io";

const GoBack = memo(() => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const pathSegments = pathname.split('/').filter(Boolean);

  const goBackToParent = () => {
    pathSegments.pop();
    const parentPath = `/${pathSegments.join('/')}`;

    navigate({
      pathname: state?.prevLocation || parentPath,
      search: state?.search,
    });
  };

  return (
    <div className={styles.back} onClick={goBackToParent}>
      <IoIosArrowBack/>
      <span>Back</span>
    </div>
  );
});

export default GoBack;

GoBack.displayName = 'GoBack';
