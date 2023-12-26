import React from 'react';
import './NotFoundPage.scss';
import { NoResults } from '../../components/NoResults';

type Props = {
  title?: string,
};

export const NotFoundPage: React.FC<Props> = ({
  title = 'NotFoundPage',
}) => (
  <div className="NotFoundPage NotFoundPage__container page__container">
    <NoResults title={title} />
  </div>
);
