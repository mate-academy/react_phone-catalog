import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './SearchParam.scss';
import React from 'react';

export const SearchParameters = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pathParts = pathname.split('/').filter(Boolean);
  const isHomePage = pathname === '/' || pathname === '/react_phone-catalog/';

  const sort = searchParams.get('sort') || 'default';
  const perPage = searchParams.get('perPage') || '4';
  const page = searchParams.get('page') || '1';

  return (
    <div className="section">
      <p className="title is-7">
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

      <p className="title is-8">
        Sort: <strong>{sort}</strong> | Per page: <strong>{perPage}</strong> |
        Page: <strong>{page}</strong>
      </p>
    </div>
  );
};
