import { useMemo } from 'react';
import styles from './Title.module.scss';

interface Props {
  text: string;
  titleLevel: '1' | '2' | '3' | '4' | '5' | '6';
}

export const Title: React.FC<Props> = ({ text, titleLevel }) => {
  const HeadingTag = useMemo(() => {
    return `h${titleLevel}` as keyof JSX.IntrinsicElements;
  }, [titleLevel]);
  const headingClassName = styles[`h${titleLevel}` as keyof typeof styles];

  return <HeadingTag className={headingClassName}>{text}</HeadingTag>;
};
