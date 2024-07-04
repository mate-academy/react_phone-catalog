import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styles from './Heading.module.css';

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className?: string;
};

const Heading: FC<HeadingProps> = ({ as: Component, children, className }) => {
  const combinedClassName = classNames(
    {
      [styles.h1]: Component === 'h1',
      [styles.h2]: Component === 'h2',
      [styles.h3]: Component === 'h3',
      [styles.h4]: Component === 'h4',
    },
    className,
  );

  return <Component className={combinedClassName}>{children}</Component>;
};

export default Heading;
