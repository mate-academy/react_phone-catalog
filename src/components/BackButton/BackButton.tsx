import './BackButton.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';

interface Props {
  prevLink: string;
}

export const BackButton: React.FC<Props> = ({ prevLink }) => (
  <Link
    to={{ pathname: prevLink }}
    data-cy="backButton"
    className="back-button"
  >
    <Icon iconType={IconType.arrowLeft} />

    <span className="back-button__text">Back</span>
  </Link>
);
