import { ButtonsProps } from '@shtypes/ButtonProps';
import { Button } from '@ui/button';
import styles from './header-buttons.module.scss';

type Props = {
  buttons: ButtonsProps[];
  className: string;
};

export const HeaderButtons = ({ buttons, className }: Props) => {
  return (
    <div className={`${styles['buttons-container']} ${className} `}>
      {buttons.map(btn => (
        <Button key={btn.name} data={btn} className={'header-button'} />
      ))}
    </div>
  );
};
