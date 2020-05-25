import React from 'react';

type ButtonProps = {
  classCSS: string;
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ classCSS, title }) => (
  <button className={classCSS}>{title}</button>
)
