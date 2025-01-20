import React from 'react';
import './NotFoundPage.scss';
import { NotFound } from '../../../types';
import { Images } from '../../../images';

type Props = {
  title: NotFound;
};

export const NotFoundPage: React.FC<Props> = ({ title }) => {
  const getNotFoundImage = () =>
    title === NotFound.Page ? Images.NotFound.Page : Images.NotFound.Product;

  return (
    <section className="container notfound">
      <h1>{title}</h1>

      <img
        src={getNotFoundImage()}
        alt="notFoundImg"
        className="notfound__image"
      />
    </section>
  );
};
