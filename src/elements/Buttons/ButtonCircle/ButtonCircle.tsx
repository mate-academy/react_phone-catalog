import React from 'react';
import { Link } from 'react-router-dom';
import { changeColorToHex } from '../../../helpers/utils/changeColorToHex';
import './ButtonCircle.scss';

type Props = {
  color: string;
  path: { search: string } | string;
};

export const ButtonCircle: React.FC<Props> = ({ color, path }) => {
  return (
    <Link
      to={path}
      className="buttonCircle"
    >
      <div
        className="buttonCircle__color"
        style={{ backgroundColor: changeColorToHex(color) }}
      />
    </Link>
  );
};
