import React from 'react';
import { Specification } from '../../types/Specification';
import './Specs.scss';

interface Props {
  specs: Specification[];
}

export const Specs: React.FC<Props> = ({ specs }) => (
  <ul className="specs">
    {specs.map(({ name, text }) => (
      <li key={name} className="specs__spec">
        <div className="specs__property">
          {name}
        </div>

        <p>
          {Array.isArray(text) ? text.join(', ') : text}
        </p>
      </li>
    ))}
  </ul>
);
