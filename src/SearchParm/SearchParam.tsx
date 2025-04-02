import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './SearchParam.scss';
import React from 'react';

export const SearchParameters = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pathParts = pathname.split('/').filter(Boolean);

  return (
    <div className="section">
      <p className="title is-7">
        {/* Додаємо onClick на іконку Home */}
        <FaHome
          style={{ marginRight: '4px', cursor: 'pointer' }}
          onClick={() => navigate('/')} // Перехід на домашню сторінку
        />

        {pathParts.length > 0 && (
          <>
            {' > '}
            {pathParts.map((part, index) => (
              <span key={index}>
                {index > 0 && ' > '}
                {part}
              </span>
            ))}
          </>
        )}
      </p>

      {search && <p className="title is-8">{search.replace('/', '>')}</p>}
    </div>
  );
};
