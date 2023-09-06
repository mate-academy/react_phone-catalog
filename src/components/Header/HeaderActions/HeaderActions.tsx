import { NavigationLink } from '../Navigation/NavigatioLink';
import { IconLinks } from './IconLinks';

import './HeaderActions.scss';

const ACTIONS_PAGES = ['favourites', 'cart'];

export const HeaderActions = () => (
  <div className="Actions">
    {ACTIONS_PAGES.map(currentAction => (
      <NavigationLink
        to={currentAction}
        type="icon"
        aria-label={currentAction}
      >
        <IconLinks type={currentAction as 'favourites' | 'cart'} />
      </NavigationLink>
    ))}
  </div>
);
