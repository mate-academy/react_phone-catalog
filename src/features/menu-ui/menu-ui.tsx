import { MenuButtonsProps, MenuPath } from '../../store/types/Menu-UIProps';
import { MenuButton } from '../../store/ui/menu-button';
import './menu-ui.scss';

export const MenuUI = () => {
  const buttons: MenuButtonsProps[] = [
    { name: 'menu', path: MenuPath.burger },
    { name: 'favorites', path: MenuPath.fav },
    { name: 'cart', path: MenuPath.cart },
  ];

  return (
    <div className="menu">
      {buttons.map(button => (
        <MenuButton key={button.name} data={button} />
      ))}
    </div>
  );
};
