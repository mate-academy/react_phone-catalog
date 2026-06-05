import classNames from 'classnames';

import styles from './Icon.module.scss';
import IconSvg from '@/assets/images/icons/menu.svg?react';
import HeartSvg from '@/assets/images/icons/heart.svg?react';
import HeartLikeSvg from '@/assets/images/icons/heartLike.svg?react';
import CloseSvg from '@/assets/images/icons/close.svg?react';
import CartSvg from '@/assets/images/icons/cart.svg?react';
import ArrowRightSvg from '@/assets/images/icons/arrow-right.svg?react';
import HomeSvg from '@/assets/images/icons/home.svg?react';
import PlusSvg from '@/assets/images/icons/plus.svg?react';
import MinusSvg from '@/assets/images/icons/minus.svg?react';
import SettingSvg from '@/assets/images/icons/setting.svg?react';
import SunSvg from '@/assets/images/icons/sun.svg?react';
import MoonSvg from '@/assets/images/icons/moon.svg?react';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  type:
    | 'menu'
    | 'heart'
    | 'heartLike'
    | 'close'
    | 'cart'
    | 'arrowRight'
    | 'home'
    | 'minus'
    | 'plus'
    | 'setting'
    | 'sun'
    | 'moon';
};

export const Icon: React.FC<Props> = ({ type, className, ...props }: Props) => {
  return (
    <>
      <div {...props} className={classNames(className, styles['icon'])}>
        {type === 'menu' && <IconSvg className={styles.icon} />}
        {type === 'heart' && <HeartSvg className={styles.icon} />}
        {type === 'heartLike' && <HeartLikeSvg className={styles.icon} />}
        {type === 'close' && <CloseSvg className={styles.icon} />}
        {type === 'cart' && <CartSvg className={styles.icon} />}
        {type === 'arrowRight' && <ArrowRightSvg className={styles.icon} />}
        {type === 'home' && <HomeSvg className={styles.icon} />}
        {type === 'minus' && <MinusSvg className={styles.icon} />}
        {type === 'plus' && <PlusSvg className={styles.icon} />}
        {type === 'setting' && <SettingSvg className={styles.icon} />}
        {type === 'sun' && <SunSvg className={styles.icon} />}
        {type === 'moon' && <MoonSvg className={styles.icon} />}
      </div>
    </>
  );
};
