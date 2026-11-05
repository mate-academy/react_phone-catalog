import ReactMarkdown from 'react-markdown';

import classNames from 'classnames';

import { Typography } from '@/components/atoms';

import styles from './RightsTemplate.module.scss';

type Props = {
  title: string;
  text: string;
  className?: string;
};

export const RightsTemplate = ({ title, text, className }: Props) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Typography
        variant="h3"
        className={styles.title}
      >
        {title}
      </Typography>

      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};
