import React from 'react';
import { NoResults } from '../../components/NoResults';

import './NotFoundPage.scss';

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
