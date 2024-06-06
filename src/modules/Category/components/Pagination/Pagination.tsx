import React, { ComponentProps, FC, useMemo } from 'react';
import cn from 'classnames';

import { getFragment } from '../../../../helpers/getFragment';
import { RoundButton } from '../../../shared/ui/RoundButton';
import { Icon } from '../../../shared/ui/Icon';
import { Container } from '../../../shared/Container';
import { RadioGroup } from '../../../shared/ui/RadioGroup';
import { usePagination } from './usePagination';
import classes from './pagination.module.scss';

type Props = ComponentProps<typeof Container> & {
  numberOfProducts: number;
};

export const Pagination: FC<Props> = ({
  className,
  numberOfProducts,
  ...props
}) => {
  const { lastPage, selectPage, currentPage } = usePagination(numberOfProducts);
  const pages = useMemo(
    () => Array.from(Array(lastPage), (_, i) => i + 1),
    [lastPage],
  );

  const canSelectPrev = currentPage > 1;
  const canSelectNext = currentPage < lastPage;

  const selectNext = () => selectPage(currentPage + 1);
  const selectPrev = () => selectPage(currentPage - 1);
  const createSelectExact = (newPage: number) => () => {
    selectPage(newPage);
    setTimeout(() => window.scrollTo({ behavior: 'smooth', top: 0 }), 0);
  };

  return (
    <Container {...props} className={cn(classes.pagination, className)}>
      <RoundButton
        disabled={!canSelectPrev}
        onClick={selectPrev}
        className={classes.pagination__button}
      >
        <Icon variant="arrow-left" />
      </RoundButton>
      <div className={classes.pagination__crumbs}>
        <RadioGroup>
          {getFragment(4, currentPage - 1, pages).map(i => (
            <RadioGroup.ButtonWithText
              onChange={createSelectExact(i)}
              key={i}
              checked={i === currentPage}
            >
              {i}
            </RadioGroup.ButtonWithText>
          ))}
        </RadioGroup>
      </div>
      <RoundButton
        disabled={!canSelectNext}
        onClick={selectNext}
        className={classes.pagination__button}
      >
        <Icon variant="arrow-right" />
      </RoundButton>
    </Container>
  );
};
