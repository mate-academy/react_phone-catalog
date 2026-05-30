import classNames from 'classnames';

type SortValueType = {
  id: number;
  value: number | string;
  label: string;
};

type ActionBtns = {
  itemsValue: SortValueType[];
  label: string;
  value: string | number;
  onSortValue: (value: number | string) => void;
  isSort: boolean;
  onSort: (value: boolean) => void;
  open?: boolean;
  onOpen: (value: boolean) => void;
  urlStr?: URLSearchParams;
  onUrlStr?: (params: URLSearchParams) => void;
  btnLabel?: string;
  onBtnLabel?: (value: string) => void;
};

export const ActionBtn = ({
  itemsValue,
  label,
  value,
  onSortValue,
  isSort,
  onSort,
  onOpen,
  urlStr,
  onUrlStr,
  btnLabel,
  onBtnLabel,
}: ActionBtns) => {
  const handleUrlParams = (sortValue: number | string) => {
    if (urlStr) {
      const params = new URLSearchParams(urlStr?.toString());

      if (typeof sortValue === 'number') {
        params.set('sort', sortValue.toString());
      } else {
        params.set('sort', sortValue);
      }

      onUrlStr?.(params);
    }
  };

  const handleStateList = () => {
    if (!isSort) {
      onSort(true);
      onOpen(false);
    } else {
      onSort(false);
      onOpen(false);
    }
  };

  return (
    <>
      <select
        name="sort-product-select"
        // id="sort-product-select"
        className="select-hidden"
        onChange={() => {
          onSortValue(value);
          handleUrlParams(value);
        }}
      >
        {itemsValue.map(item => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <span className="action-btn-label">{label}</span>
      <br />
      <button
        onClick={() => {
          handleStateList();
        }}
        className={classNames('top-action-btn', {
          'btn-active': isSort,
        })}
      >
        {btnLabel ? btnLabel : value}

        {!isSort && (
          <img
            src="img/shared/next-ordinary.svg"
            alt=""
            className="list-closed"
          />
        )}

        {isSort && (
          <img
            src="img/shared/next-ordinary.svg"
            alt=""
            className="list-open"
          />
        )}
      </button>

      {isSort && (
        <ul className="sort-values-list">
          {itemsValue.map(item => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onSortValue(item.value);
                  onSort(false);
                  handleUrlParams(item.value);
                  onBtnLabel?.(item.label);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
