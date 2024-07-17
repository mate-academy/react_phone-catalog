import React from 'react';
import classes from './Button.module.scss';

type Props = {
  text: string;
};

export const Button: React.FC<Props> = ({ text }) => {
  return <div className={classes.button}>{text}</div>;
};
