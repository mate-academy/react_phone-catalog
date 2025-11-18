import { FC } from 'react';
import loaderDark from '../../../../assets/images/icons/loader-dark.svg';
import s from './Loader.module.scss';

export const Loader: FC = () => (
  <div className={s.loader}>
    <img src={loaderDark} alt="Products are loading" />
  </div>
);
