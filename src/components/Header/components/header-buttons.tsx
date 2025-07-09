import { Button } from '@ui/button';
import styles from './header-buttons.module.scss';
import btns from '@shared/styles/regularButton.module.scss';
import { AriaNames, IconPath } from '@shared/types/ButtonProps';

type Props = {
  buttons: { ariaName: AriaNames; iconPath: IconPath }[];
};

const ButtonCN = { main: `${btns.button}`, icon: `${btns.button__icon}` };

export const HeaderButtons: React.FC<Props> = ({ buttons }) => {
  return (
    <div className={styles['buttons-container']}>
      {buttons.map(btn => (
        <Button
          key={btn.ariaName}
          ariaName={btn.ariaName}
          iconPath={btn.iconPath}
          className={ButtonCN}
        />
      ))}
    </div>
  );
};
