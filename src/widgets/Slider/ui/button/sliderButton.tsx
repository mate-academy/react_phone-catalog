import { Button } from '@ui/button';
import styles from '@shared/styles/regularButton.module.scss';
import { AriaNames, IconPath } from '@shared/types/ButtonProps';
import { Mode } from '@widgets/Slider/model/defaultConfig';
import { useSlContext } from '@widgets/Slider/model/context/sliderContext';

type Props = {
  classNamePrev: string;
  classNameNext: string;
  onClick: (mod: number) => void;
  disableButton: () => number;
};

export const SlButtons: React.FC<Props> = ({
  classNamePrev,
  classNameNext,
  onClick,
  disableButton,
}) => {
  const { mode } = useSlContext();

  const btnLeft = {
    ariaName: AriaNames.Prev,
    iconPath: IconPath.Prev,
    mod: -1,
    className: {
      main: `${styles.button} ${classNamePrev}`,
      icon: styles.button__icon,
    },
    disabled: mode === Mode.INFINITE ? false : disableButton() === 0,
  };

  const btnRight = {
    ariaName: AriaNames.Next,
    iconPath: IconPath.Next,
    mod: 1,
    className: {
      main: `${styles.button} ${classNameNext}`,
      icon: styles.button__icon,
    },
    disabled: mode === Mode.INFINITE ? false : disableButton() === 1,
  };

  const buttons = [btnLeft, btnRight];

  return (
    <>
      {buttons.map(({ ariaName, iconPath, mod, className, disabled }) => (
        <Button
          key={ariaName}
          ariaName={ariaName}
          iconPath={iconPath}
          className={className}
          fn={() => onClick(mod)}
          disabled={disabled}
        />
      ))}
    </>
  );
};
