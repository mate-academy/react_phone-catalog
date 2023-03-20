import React from 'react';

const path = process.env.PUBLIC_URL;
const image = '_new/img/icons/LOGO.svg';

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => (
  <div className={className}>
    <img src={path + image} alt="logo" />
  </div>
);
