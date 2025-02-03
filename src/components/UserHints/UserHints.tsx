import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Category } from '../../types/CategoryEnum';

type Props = {
  deviceName?: string;
};

export const UserHints: React.FC<Props> = ({ deviceName }) => {
  const { category } = useParams();

  const titlePage = useMemo(() => {
    switch (category?.toLowerCase()) {
      case Category.phones.toLowerCase():
        return 'Phones';
      case Category.tablets.toLowerCase():
        return 'Tablets';
      case Category.accessories.toLowerCase():
        return 'Accessories';
      case Category.favourites.toLowerCase():
        return 'Favourites';
      default:
        return '';
    }
  }, [category]);

  return (
    <div className="user-hints">
      <div className="user-hints__content">
        <Link to={'/'} className="reset-link">
          <div className="icon icon--home"></div>
        </Link>
        <div className="icon icon--array--right--dark"></div>
        <Link to={`../${category}`} className="reset-link">
          <div
            className={cn('user-hints__info', {
              'user-hints__info--disable': deviceName,
            })}
          >
            {titlePage}
          </div>
        </Link>
        {deviceName && (
          <>
            <div className="icon icon--array--right--dark"></div>
            <Link to={'.'} className="reset-link">
              <div className="user-hints__info">{deviceName}</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
