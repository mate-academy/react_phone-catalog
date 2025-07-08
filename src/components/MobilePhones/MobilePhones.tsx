import { Routes, Route, Link } from 'react-router-dom';
import mobilePageStyles from './MobilePhones.module.scss';

const MobilePhones = () => {
  return (
    <>
      <div className={mobilePageStyles['mobile-page']}>
        <div className={mobilePageStyles['mobile-page__path-of-user']}>
          <Link
            to="/"
            className={mobilePageStyles['mobile-page__go-home']}
          ></Link>
          <Link
            to="/phones"
            className={mobilePageStyles['mobile-page__current-page']}
          ></Link>
          <span>Home</span>
        </div>
        <h1>Mobile phones</h1>

        <span className={mobilePageStyles['mobile-page__quantity-mobils']}>
          95 models
        </span>
      </div>
    </>
  );
};

export default MobilePhones;
