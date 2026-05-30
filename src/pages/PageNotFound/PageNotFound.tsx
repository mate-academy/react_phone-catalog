import { useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

import { BackButton } from '../../components/BackButton';

import styles from './PageNotFound.module.scss';
const { page, page__notFoundImg } = styles;

type PageNotFoundProps = {
  productNotFound?: boolean;
  notImplemented?: boolean;
};

export const PageNotFound = ({
  productNotFound,
  notImplemented,
}: PageNotFoundProps) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'idle') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [navigation]);

  const imgSrc = productNotFound
    ? '/img/product-not-found.jpg'
    : notImplemented
      ? '/img/page-not-implemented.jpg'
      : '/img/page-not-found.jpg';

  return (
    <div className={page}>
      <BackButton notFoundPage />

      <img
        src={imgSrc}
        alt="Page not found"
        className={page__notFoundImg}
        onClick={() => navigate('/')}
      />
    </div>
  );
};
