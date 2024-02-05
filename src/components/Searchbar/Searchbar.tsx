import { Icons } from '../../types/enums/Icons';
import { Icon } from '../Icon';
import './Searchbar.scss';

export const Searchbar = () => {
  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        type="text"
        placeholder="Search in ..."
      />
      <div className="searchbar__icon">
        <Icon icon={Icons.Search} />
      </div>
    </div>
  );
};
