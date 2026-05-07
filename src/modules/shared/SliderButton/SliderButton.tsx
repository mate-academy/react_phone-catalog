import classNames from 'classnames';
import s from './SliderButton.module.scss';

type Props = {
  direction?: 'up' | 'down' | 'left' | 'right' | 'plus' | 'minus';
  disabled?: boolean;
  forBanner?: boolean;
  onClick?: () => void;
};

export const SliderButton = ({
  direction = 'right',
  disabled = false,
  forBanner = false,
  onClick = () => {},
}: Props) => {
  return (
    <div
      className={classNames(s.button, s[`button--${direction}`], {
        [s[`button--disabled`]]: disabled,
        [s[`button--forBanner`]]: forBanner,
      })}
      onClick={onClick}
    ></div>
  );
};
