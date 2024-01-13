import React from 'react';
import './Fail.scss';
import { ButtonBack } from '../Buttons/ButtonBack/ButtonBack';

type Props = {
  title:
 `${string} not found`
  | `${string} empty`
  | `Sorry! All ${string} are sold out`
  | 'We are sorry, but this feature is not implemented yet';
  noBck?: boolean;
  text?: boolean;
};

export const Fail: React.FC<Props> = ({ title, noBck, text }) => (
  <div className="fail">
    {!noBck && <ButtonBack />}

    <h1 className="fail__title">{title}</h1>

    {text && (
      <p className="fail__text">Come back later</p>
    ) }
  </div>
);
