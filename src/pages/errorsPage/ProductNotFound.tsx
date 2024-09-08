import { FC } from 'react';

import ErrorImage from '/img/error/product-not-found.png';

const style = {
  display: 'block',
  marginInline: 'auto',
};

export const ProductNotFound: FC = () => (
  <img src={ErrorImage} alt="Product not found" style={style} />
);
