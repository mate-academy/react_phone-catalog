/* eslint-disable  @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Container } from '../../../shared/Container';
import { Spec, SpecsList } from '../../../shared/ui/SpecsList';
import { Text } from '../../../shared/ui/Text';
import { TextWithTitle } from '../TextWithTitle';
import classes from './description.module.scss';

type Props = Omit<ComponentPropsWithoutRef<typeof Container.Grid>, 'about'> & {
  specs: Spec[];
  isLoaded: boolean;
  about: { title: string; text: string[] }[];
};

const textWithTitleSkeletons = Array.from(Array(3), (_, i) => (
  <TextWithTitle.Skeleton
    key={i}
    className={cn(
      classes.description__aboutItem,
      classes.description__aboutItem_skeleton,
    )}
  />
));

export const Description: FC<Props> = ({
  isLoaded,
  specs,
  about,
  className,
  ...props
}) => {
  return (
    <Container.Grid {...props} className={cn(classes.description, className)}>
      <section className={classes.description__about}>
        <Text.H3 element="h3" className={classes.description__title}>
          About
        </Text.H3>
        {isLoaded
          ? about.map((aboutItem, i) => (
              <TextWithTitle
                key={i}
                className={classes.description__aboutItem}
                text={aboutItem.text}
                title={aboutItem.title}
              />
            ))
          : textWithTitleSkeletons}
      </section>
      <section className={classes.description__specs}>
        <Text.H3 element="h3" className={classes.description__title}>
          Tech specs
        </Text.H3>
        <SpecsList
          className={classes.description__specsList}
          isLoaded={isLoaded}
          specs={specs}
        />
      </section>
    </Container.Grid>
  );
};
