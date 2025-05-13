import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './SearchParam.scss';
import React from 'react';

export const SearchParameters = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pathParts = pathname.split('/').filter(Boolean);

  // Перевірка: якщо ми на головній сторінці
  const isHomePage = pathname === '/' || pathname === '/react_phone-catalog/';

  return (
    <div className="section">
      <p className="title is-7">
        {/* Показуємо іконку тільки якщо ми НЕ на головній сторінці */}
        {!isHomePage && (
          <FaHome
            style={{ marginRight: '4px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        )}

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
