import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import './BackButton.scss';
import ArrowIcon from '../ArrowIcon';

interface Props {
  className?: string,
}

export const BackButton: React.FC<Props> = memo(({className}) => (
  <Link to=".." className={`back-button ${className || ''}`} >
    <ArrowIcon className='back-button__icon'/>

    <span>Back</span>
  </Link>
));
