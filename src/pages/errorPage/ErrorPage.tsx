import { FC } from 'react';

import ErrorImage from '/img/error/page-not-found.png';

export const ErrorPage: FC = () => (
  <div>
    <img src={ErrorImage} alt="Page not found" />
  </div>
);
