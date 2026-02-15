import React from 'react';
import '@/styles/main.scss';
import { Link } from 'react-router-dom';

interface Props {
  href: string;
}

export const BackButton: React.FC<Props> = ({ href }) => {
  return (
    <Link to={href} className="button button__back">
      <i className="icon icon--left"></i>
      <span className="text__small button__back--text">Back</span>
    </Link>
  );
};
