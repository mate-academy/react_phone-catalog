import { FC } from 'react';
import './Title.scss';

type Props = {
  title: string;
};

export const Title: FC<Props> = ({ title }) => (
  <h1 className="title">{title}</h1>
);
