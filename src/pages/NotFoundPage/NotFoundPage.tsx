import { useEffect, useState } from 'react';
import { wait } from '../../httpClient';
import { Loader } from '../../components/Loader';
import photoNotFound from '../../img/otherImages/page-not-found.png';
import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wait().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.NotFoundPage}>
      <h1 className={s.NotFoundPage__title}>404 - Page Not Found</h1>

      <img src={photoNotFound} className="cat-photo" alt="cat-photo" />
    </div>
  );
};
