import React from 'react';
import style from './ProductNotFound.module.scss';

export const ProductNotFound: React.FC = () => {
  console.log('Page not Found');

  return <div className={style.notfount}>Product Not Found</div>;
};
