import './Title.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';

interface Props {
  text: string,
  length: number,
  filteredLength: number,
  isLoader?: boolean,
}

export const Title: React.FC<Props> = ({
  text,
  length,
  filteredLength,
  isLoader,
}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query);

  return (
    <div className="title__container">
      <h1 className="title__text">{text}</h1>

      {!isLoader && (
        <p className="title__models">
          {query
            ? `${filteredLength} models of ${length}`
            : `${length} models`}
        </p>
      )}
    </div>
  );
};
