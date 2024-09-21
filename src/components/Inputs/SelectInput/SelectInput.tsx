import { useEffect, useRef, useState } from 'react';
import {
  InputBlockStyled,
  ContainerStyled,
  LabelStyled,
  SelectStyled,
  ImgRightStyled,
} from './styled';
import OptionSwiper from './OptionSwiper/OptionSwiper';
import { VECTOR_SVG } from '../../../utils/SVG';

const useOutsideClick = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent | TouchEvent) => {
    if (!ref.current || ref.current.contains(e.target as Node)) {
      return;
    }

    callback();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback]);
};

type Props = {
  label?: string;
  items: string[];
  width?: string;
  variant?: 'default' | 'topSwipe';
  value: string;
  setValue: (item: string) => void;
};

export const SelectInput: React.FC<Props> = ({
  label = '',
  items,
  width = '176px',
  variant = 'default',
  value,
  setValue,
}) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const selectRef = useRef(null);

  const styledOptions = (): { [key: string]: string } => {
    switch (variant) {
      case 'default': {
        return {
          left: '0',
          top: !!label ? '53px' : '44px',
          width: width,
        };
      }

      case 'topSwipe': {
        return {
          left: '0',
          bottom: '44px',
          width: width,
        };
      }
    }
  };

  useOutsideClick(selectRef, () => {
    if (isOpenOptions) {
      setIsOpenOptions(false);
    }
  });

  const handleClickChange = (item: string) => {
    setValue(item);
    setIsOpenOptions(false);
  };

  return (
    <InputBlockStyled width={width}>
      <ContainerStyled ref={selectRef}>
        {!!label && (
          <LabelStyled
            onClick={() => setIsOpenOptions(prewValue => !prewValue)}
          >
            {label}
          </LabelStyled>
        )}

        <SelectStyled
          isOpened={isOpenOptions}
          onClick={() => setIsOpenOptions(prewValue => !prewValue)}
        >
          {value}
        </SelectStyled>

        <ImgRightStyled
          isLabel={!!label}
          onClick={() => setIsOpenOptions(prewValue => !prewValue)}
          isOpenOptions={isOpenOptions}
        >
          <VECTOR_SVG variant="bottom" />
        </ImgRightStyled>

        <OptionSwiper
          items={items}
          isActive={isOpenOptions}
          css={styledOptions()}
          isClick={handleClickChange}
          activeItem={value}
          variant={variant}
        />
      </ContainerStyled>
    </InputBlockStyled>
  );
};
