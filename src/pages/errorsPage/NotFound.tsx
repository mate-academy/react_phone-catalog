import { FC } from 'react';

import ErrorImage from '/img/error/page-not-found.png';

const style = {
  display: 'block',
  marginInline: 'auto',
};

export const NotFound: FC = () => (
  <img src={ErrorImage} alt="Page not found" style={style} />
);
