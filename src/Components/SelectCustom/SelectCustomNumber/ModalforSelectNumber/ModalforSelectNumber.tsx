import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  options: number[];
  button: React.RefObject<HTMLButtonElement>;
  setPagination: React.Dispatch<React.SetStateAction<string>>;
  animationOnDisappear: boolean;
  closeHandler: () => void;
  setPerPageParam: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ModalforSelectNumber: React.FC<Props> = (
  {
    options,
    button,
    setPagination,
    animationOnDisappear,
    closeHandler,
    setPerPageParam,
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
      className={`Select__modal Number ${animationOnDisappear && 'Dissapear'}`}
    >
      {
        options.map(el => {
          return (
            <button
              key={el}
              type="button"
              className="Select__modalOption"
              onClick={() => {
                searchParams.set('perPage', `${el}`);
                setSearchParams(searchParams);
                setPagination(`${el}`);
                closeHandler();
                setPerPageParam(`${el}`);
              }}
            >
              {el}
            </button>
          );
        })
      }
    </div>
  );
};
