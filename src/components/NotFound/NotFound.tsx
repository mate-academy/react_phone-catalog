import React from 'react';
import style from './NotFound.module.scss';
import { NotFoundImage } from '../../constants/notFound';
import { useTranslate } from '../../hooks/useTranslate';
import { Link } from 'react-router-dom';

type Props = {
  img: NotFoundImage;
  text: string;
};

export const NotFound: React.FC<Props> = ({ img, text }) => {
  const t = useTranslate();

  return (
    <div className={style.notFound}>
      <img className={style.notFoundImg} src={img} alt="page not found" />

      <div className={style.notFoundInfo}>
        <p className={style.notFoundTitle}>{t(text)}</p>

        <div className={style.notFoundAction}>
          <Link to="/" replace className={style.notFoundLink}>
            {t('not-found.back-to-home')}
          </Link>
        </div>
      </div>
    </div>
  );
};
