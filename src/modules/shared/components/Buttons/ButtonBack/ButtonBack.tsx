import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonBack.scss';
import { Icon } from '../../Icon';
import { useLanguage } from '../../../../../context/LanguageContext';

type Props = {
  className: string;
};

export const ButtonBack: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { texts } = useLanguage();

  return (
    <button
      className={`back-default ${className}`}
      onClick={() => navigate(-1)}
    >
      <Icon className="back-default__img" name="arrow-left" />
      <span className="back-default__text">{texts.back}</span>
    </button>
  );
};
