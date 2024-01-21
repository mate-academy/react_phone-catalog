import { Icons } from '../../types/enums/Icons';
import { Icon } from '../Icon';
import './style/Searchbar.scss';

export const Searchbar = () => (
  <div className="searchbar">
    <input
      className="searchbar__input font_body"
      type="text"
      placeholder="Search in phones..."
    />
    <Icon type={Icons.Search} />
  </div>
);
