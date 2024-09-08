import { FC } from 'react';
import cls from './notFound.module.scss';

interface Props {
  src: string;
  alt: string;
}

export const NotFound: FC<Props> = ({ alt, src }) => (
  <div className={cls.wrapper}>
    <img src={src} alt={alt} />
  </div>
);
