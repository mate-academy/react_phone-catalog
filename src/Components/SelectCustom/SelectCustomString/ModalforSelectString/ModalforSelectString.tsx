import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  options: string[][];
  button: React.RefObject<HTMLButtonElement>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  animationOnDisappear: boolean;
  closeHandler: () => void;
  setSortByParam: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ModalforSelectString: React.FC<Props> = (
  {
    options,
    button,
    setSortBy,
    animationOnDisappear,
    closeHandler,
    setSortByParam,
  },
) => {
  const modal = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const closeHandle = (event: MouseEvent) => {
      if (!modal.current?.contains(event.target as HTMLInputElement)
      && !button.current?.contains(event.target as HTMLInputElement)) {
        closeHandler();
      }
    };

    document.addEventListener('mousedown', closeHandle);

    return () => document.removeEventListener('mousedown', closeHandle);
  }, []);

  return (
    <div
      ref={modal}
      className={`Select__modal ${animationOnDisappear && 'Dissapear'}`}
    >
      {
        options.map(el => {
          return (
            <button
              key={el[1]}
              type="button"
              className="Select__modalOption"
              onClick={() => {
                searchParams.set('sort', el[0]);
                setSearchParams(searchParams);
                setSortBy(el[1]);
                closeHandler();
                setSortByParam(el[0]);
              }}
            >
              {el[1]}
            </button>
          );
        })
      }
    </div>
  );
};
