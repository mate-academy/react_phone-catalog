import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Text } from '../../../shared/ui/Text';
import { getBreakElements } from './getBreakElements';
import classes from './textWithTitle.module.scss';

type Props = ComponentPropsWithoutRef<'article'> & {
  title: string;
  text: string[];
};

export const TextWithTitle: FC<Props> = ({
  text,
  title,
  className,
  ...props
}) => {
  return (
    <article {...props} className={cn(classes.container, className)}>
      <Text.H4 className={classes.container__title}>{title}</Text.H4>
      <Text className={classes.container__text}>
        {text.map((textItem, index) => (
          <React.Fragment key={index}>
            {textItem}
            {getBreakElements(index, text.length)}
          </React.Fragment>
        ))}
      </Text>
    </article>
  );
};
