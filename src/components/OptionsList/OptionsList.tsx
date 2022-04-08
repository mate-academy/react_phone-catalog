import {
  FunctionComponent,
  useEffect,
  useRef,
} from 'react';

// Styles
import './OptionsList.scss';

type Props = {
  options: string[];
  onChangeItem: (sortItem: string) => void;
  close: () => void;
};

export const OptionsList: FunctionComponent<Props> = ({
  options,
  onChangeItem,
  close,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const closeOptions = (e: { target: any; }) => {
      if (!listRef.current?.parentElement?.contains(e.target)) {
        close();
      }
    };

    document.addEventListener('mousedown', closeOptions);

    return () => {
      document.removeEventListener('mousedown', closeOptions);
    };
  });

  return (
    <ul className="OptionsList" ref={listRef}>
      {options.map(option => (
        <li key={option}>
          <button
            type="button"
            className="OptionsList__item"
            onClick={() => {
              onChangeItem(option);
              close();
            }}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};
