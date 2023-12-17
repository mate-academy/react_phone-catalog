import classNames from 'classnames';

export type PaginationProps = {
  maxPages: number
  curentPage: number
  handleChanePage: (pageNum: number) => void
};

export const Pagination = ({
  maxPages, curentPage, handleChanePage,
}: PaginationProps) => {
  const disablePaginationRight = (): boolean => {
    if (curentPage < maxPages) {
      return false;
    }

    return true;
  };

  const disablePaginationLeft = (): boolean => {
    if (curentPage > 1) {
      return false;
    }

    return true;
  };

  const actualPage = (page: number): boolean => {
    if (page === curentPage) {
      return true;
    }

    return false;
  };

  const buttonsGenerator = () => {
    const buttons = [];

    for (let i = 1; i <= maxPages; i += 1) {
      buttons.push(
        <button
          type="button"
          className={classNames('buttons',
            { buttons__page: actualPage(i) })}
          data-cy="paginationRight"
          onClick={() => handleChanePage(i)}
          key={i}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className="product__buttons" data-cy="pagination">
      <button
        type="button"
        className={classNames('buttons buttons__arrow--left',
          { 'buttons__arrow--left-disabled': disablePaginationLeft() })}
        data-cy="paginationLeft"
        onClick={() => handleChanePage(curentPage - 1)}
        disabled={disablePaginationLeft()}
        aria-label="arrow--left"
      />
      {buttonsGenerator()}

      <button
        type="button"
        className={classNames('buttons buttons__arrow--right',
          { 'buttons__arrow--right-disabled': disablePaginationRight() })}
        data-cy="paginationRight"
        onClick={() => handleChanePage(curentPage + 1)}
        disabled={disablePaginationRight()}
        aria-label="arrow--right"
      />

    </div>
  );
};
