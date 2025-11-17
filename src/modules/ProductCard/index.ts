import home from '@Images/icons/Home.svg';
import style from './productCard.module.scss';
import arrow from '@Images/icons/Arrow-black-right.svg';
import { getData } from '@Fetch';
import { Button } from '@GlobalComponents';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import CardLike from './Components/CardAlsoLike/CardLike';

export {
  home,
  style,
  arrow,
  getData,
  Button,
  NotFoundPage,
  Skeleton,
  CardLike,
};
