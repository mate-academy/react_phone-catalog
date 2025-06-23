import { ButtonsProps } from '../../../shared/types/Menu-UIProps';
import { MenuButton } from '../../../shared/ui/menu-button';
import styles from './header-buttons.module.scss';

type Props = {
  buttons: ButtonsProps[];
  className: string;
};

export const HeaderButtons = ({ buttons, className }: Props) => {
  return (
    <div className={`${styles['buttons-container']} ${className} `}>
      {buttons.map(btn => (
        <MenuButton key={btn.name} data={btn} className={'header-button'} />
      ))}
    </div>
  );
};
