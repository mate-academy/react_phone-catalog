import { FC } from 'react';
import classNames from 'classnames';
import icons from '../../../shared/styles/icons.module.scss';
import { Section } from '../../../shared/ui/Section';
import { Button, ButtonTheme } from '../../../shared/ui/forms';
// import cls from './paginationProducts.module.scss';

interface Props {
  className?: string;
  onChangePage: (item: number) => void;
  pagesCount: number;
  lastSection?: boolean;
}

export const PaginationProducts: FC<Props> = ({
  onChangePage,
  pagesCount,
  lastSection,
}) => {
  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  const onClickHandler = (item: number) => {
    onChangePage(item);
  };

  return (
    <Section lastSection={lastSection}>
      <div hidden={pagesCount === 1}>
        <Button
          className={classNames(icons['_icon-arrow'])}
          theme={ButtonTheme.SQUARE}
        />
        <div style={{ display: 'flex' }}>
          {pages.map(item => (
            <Button
              key={item}
              theme={ButtonTheme.SQUARE}
              onClick={() => onClickHandler(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <Button
          className={classNames(icons['_icon-arrow'])}
          theme={ButtonTheme.SQUARE}
        />
      </div>
    </Section>
  );
};
