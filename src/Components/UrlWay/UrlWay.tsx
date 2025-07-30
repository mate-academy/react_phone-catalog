import { Link } from 'react-router-dom';
import './UrlWay.scss';
import cn from 'classnames';
import { useThemeState } from '../../stateManagers/themeState';

interface UrlWayProps {
  category: string | undefined;
  itemId?: string;
}

export const UrlWay: React.FC<UrlWayProps> = ({ category, itemId }) => {
  const { theme } = useThemeState();
  return (
    <div className={`url-way url-way--${theme}`}>
      <Link
        to={'/'}
        className={`url-way__icon-home url-way__icon-home--${theme}`}
      ></Link>
      <div className="url-way__icon-arrow"></div>
      {itemId ?
        <Link
          to={'..'}
          className={cn('small-text category')}
        >
          {category && category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      : <Link
          to={'.'}
          className={cn('small-text', 'title-grey')}
        >
          {category && category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      }

      {itemId && (
        <>
          <div className="url-way__icon-arrow"></div>
          <span className="small-text title-grey">
            {itemId && itemId.charAt(0).toUpperCase() + itemId.slice(1)}
          </span>
        </>
      )}
    </div>
  );
};
