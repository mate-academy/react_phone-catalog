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
}

export const Section = ({
  children,
  className,
  firstSection = false,
  lastSection = false,
}: Props) => {
  return (
    <section
      className={classNames(className, {
        [cls.section]: !firstSection,
        [cls['padding-bottom']]: lastSection,
      })}
    >
      <Container>{children}</Container>
    </section>
  );
};
