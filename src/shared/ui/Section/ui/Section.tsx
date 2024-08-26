/* eslint-disable react/display-name */
import { ReactNode } from 'react';
import cls from './section.module.scss';
import classNames from 'classnames';
import { Container } from '../../Container';

interface Props {
  className?: string;
  children: ReactNode;
  firstSection?: boolean;
  lastSection?: boolean;
  homePage?: boolean;
}

export const Section = ({
  children,
  className,
  homePage = false,
  firstSection = false,
  lastSection = false,
}: Props) => {
  return (
    <section
      className={classNames(className, {
        [cls.homePage]: homePage,
        [cls.firstSection]: firstSection,
        [cls['padding-bottom']]: lastSection,
      })}
    >
      <Container>{children}</Container>
    </section>
  );
};
