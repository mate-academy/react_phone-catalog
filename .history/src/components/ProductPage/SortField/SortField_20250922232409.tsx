/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import styles from './SortField.module.scss';
import { Product } from '../../../types/Product';

type Props = {
  sort: string;
  onChange: (newSort: string) => void;
};

export const SortField: React.FC<Props> = ({ sort, onChange }) => {
  return (
    <label>
      Sort by:{' '}
      <select value={sort} onChange={e => onChange(e.target.value)}>
        <option value="Newest">Newest</option>
        <option value="Alphabetically">Alphabetically</option>
        <option value="Cheapest">Cheapest</option>
      </select>
    </label>
  );
};

