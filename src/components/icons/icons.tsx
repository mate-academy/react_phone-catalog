import classNames from 'classnames';
import styles from './icons.module.scss';
type IconName = 'arrow_down' | 'arrow_left' | 'arrow_right' | 'arrow_up' |
  'cart' | 'close' | 'favorite' | 'heart' |
  'home' | 'menu' | 'minus' | 'plus' | 'search';
type Props = {
  name: IconName;
  onClick?: () => void;
  className?: string;
}

export const IconsSvg: React.FC<Props> = ({ name, onClick, className }) => {

  return (
    <div onClick={onClick}
    className={classNames(styles.icon,styles[`icon--${name}`],className)}/>
  )
}
