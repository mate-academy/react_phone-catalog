import classNames from 'classnames';
import './Sorter.scss';

type Props = {
  isSortOpen: boolean;
  typeSort: string;
  isItemsOpen: boolean;
  itemPerPage: string;
  setIsItemsOpen: () => void;
  setIsSortOpen: () => void;
  changeSortType: (type: string) => void;
  changePerPage: (perPage: string) => void;
};

export const Sorter: React.FC<Props> = ({
  isSortOpen,
  typeSort,
  isItemsOpen,
  itemPerPage,
  setIsItemsOpen,
  setIsSortOpen,
  changeSortType,
  changePerPage,
}) => {
  return (
    <div className="sorter">
      <div className="dropdown-container dropdown-container--sort">
        <p className="dropdown-container-text">Sort by</p>
        <div>
          <div
            className={classNames('dropdown-header', { active: isSortOpen })}
            onClick={() => setIsSortOpen()}
          >
            <span id="selected-text">{typeSort}</span>
            <svg
              className="dropdown-arrow"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M9.47124 0.528636C9.73159 0.788986 9.73159 1.2111 9.47124 1.47145L5.47124 5.47144C5.21089 5.73179 4.78878 5.73179 4.52843 5.47144L0.528433 1.47144C0.268083 1.2111 0.268083 0.788985 0.528433 0.528636C0.788782 0.268286 1.21089 0.268286 1.47124 0.528636L4.99984 4.05723L8.52843 0.528636C8.78878 0.268287 9.21089 0.268287 9.47124 0.528636Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div
            className={classNames('dropdown-list', { active: isSortOpen })}
            id="dropdown-list"
          >
            <div
              className={classNames('dropdown-item', {
                selected: typeSort === 'Newest',
              })}
              onClick={() => {
                changeSortType('Newest');
              }}
            >
              Newest
            </div>
            <div
              className={classNames('dropdown-item', {
                selected: typeSort === 'Alphabetically',
              })}
              onClick={() => {
                changeSortType('Alphabetically');
              }}
            >
              Alphabetically
            </div>
            <div
              className={classNames('dropdown-item', {
                selected: typeSort === 'Cheapest',
              })}
              onClick={() => {
                changeSortType('Cheapest');
              }}
            >
              Cheapest
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-container dropdown-container--page">
        <p className="dropdown-container-text">Items on page</p>
        <div>
          <div
            className={classNames('dropdown-header', { active: isItemsOpen })}
            onClick={() => setIsItemsOpen()}
          >
            <span id="selected-text">{itemPerPage}</span>
            <svg
              className="dropdown-arrow"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M9.47124 0.528636C9.73159 0.788986 9.73159 1.2111 9.47124 1.47145L5.47124 5.47144C5.21089 5.73179 4.78878 5.73179 4.52843 5.47144L0.528433 1.47144C0.268083 1.2111 0.268083 0.788985 0.528433 0.528636C0.788782 0.268286 1.21089 0.268286 1.47124 0.528636L4.99984 4.05723L8.52843 0.528636C8.78878 0.268287 9.21089 0.268287 9.47124 0.528636Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div
            className={classNames('dropdown-list', { active: isItemsOpen })}
            id="dropdown-list"
          >
            <div
              className={classNames('dropdown-item', {
                selected: itemPerPage === '4',
              })}
              onClick={() => {
                changePerPage('4');
              }}
            >
              4
            </div>
            <div
              className={classNames('dropdown-item', {
                selected: itemPerPage === '8',
              })}
              onClick={() => {
                changePerPage('8');
              }}
            >
              8
            </div>
            <div
              className={classNames('dropdown-item', {
                selected: itemPerPage === '16',
              })}
              onClick={() => {
                changePerPage('16');
              }}
            >
              16
            </div>
            <div
              className={classNames('dropdown-item', {
                selected: itemPerPage === 'all',
              })}
              onClick={() => {
                changePerPage('all');
              }}
            >
              all
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
