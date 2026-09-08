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
        startIcon={<HiOutlineMinusSm size={16} />}
        variant="outline"
        className={styles.countBtn}
        onClick={handlePrev}
        size="small"
        squareBtn
        isDisabled={isPrevDisabled}
      />
      <input
        type="text"
        readOnly
        className={styles.value}
        value={value}
        onChange={handleChange}
      />
      <Button
        variant="outline"
        className={styles.countBtn}
        onClick={handleNext}
        squareBtn
        size="small"
        isDisabled={isNextDisabled}
        startIcon={<HiOutlinePlusSm size={16} />}
      />
    </div>
  );
};
