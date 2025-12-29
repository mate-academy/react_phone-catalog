import { ChangeEvent, FC } from 'react';
import { Button } from '../Button';
import styles from './Counter.module.scss';

import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';

interface Props {
  value: number;
  onChange: (value: number) => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}

export const Counter: FC<Props> = ({
  onChange,
  value,
  isPrevDisabled = false,
  isNextDisabled = false,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(+event.target.value);
  };

  const handlePrev = () => {
    onChange(value - 1);
  };

  const handleNext = () => {
    onChange(value + 1);
  };

  return (
    <div className={styles.wrapper}>
      <Button
        isIconOnly
        variant="outline"
        className={styles.countBtn}
        onClick={handlePrev}
        radius="50%"
        isDisabled={isPrevDisabled}
      >
        <HiOutlineMinusSm size={16} />
      </Button>
      <input
        type="text"
        readOnly
        className={styles.value}
        value={value}
        onChange={handleChange}
      />
      <Button
        isIconOnly
        variant="outline"
        className={styles.countBtn}
        onClick={handleNext}
        radius="50%"
        isDisabled={isNextDisabled}
      >
        <HiOutlinePlusSm size={16} />
      </Button>
    </div>
  );
};
