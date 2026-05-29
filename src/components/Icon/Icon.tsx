import classNames from 'classnames';

import styles from './Icon.module.scss';
import IconSvg from '@/assets/images/icons/menu.svg?react';
import HeartSvg from '@/assets/images/icons/heart.svg?react';
import HeartLikeSvg from '@/assets/images/icons/heartLike.svg?react';
import CloseSvg from '@/assets/images/icons/close.svg?react';
import CartSvg from '@/assets/images/icons/cart.svg?react';
import ArrowRightSvg from '@/assets/images/icons/arrow-right.svg?react';
import HomeSvg from '@/assets/images/icons/home.svg?react';


type Props = React.SVGProps<SVGSVGElement> & {
  type: 'menu' | 'heart' | 'heartLike' | 'close' | 'cart' | 'arrowRight'| 'home';
};

export const Icon: React.FC<Props> = ({ type, className, ...props }: Props) => {
  return (
    <>
      {type === 'menu' && <IconSvg {...props} className={classNames(className, styles['icon'])} />}
      {type === 'heart' && (
        <HeartSvg {...props} className={classNames(className, styles['icon'])} />
      )}
      {type === 'heartLike' && (
        <HeartLikeSvg {...props} className={classNames(className, styles['icon'])} />
      )}
      {type === 'close' && (
        <CloseSvg {...props} className={classNames(className, styles['icon'])} />
      )}
      {type === 'cart' && <CartSvg {...props} className={classNames(className, styles['icon'])} />}
      {type === 'arrowRight' && (
        <ArrowRightSvg {...props} className={classNames(className, styles['icon'])} />
      )}
      {type === 'home' && (
        <HomeSvg {...props} className={classNames(className, styles['icon'])} />
      )}
    </>
  );
};
