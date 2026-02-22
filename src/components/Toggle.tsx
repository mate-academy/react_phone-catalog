import { FC, useState } from 'react';
import { Button } from './Button';

interface Props {
  className?: string;
}

export const Toggle: FC<Props> = ({}) => {
  const [dark, setDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const handleClick = () => {
    setDark(prevState => !prevState);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <Button
        onClick={handleClick}
        className="bg-primary size-4 -translate-x-full rounded-full"
      ></Button>
      {dark ? 'dark' : 'light'}
    </div>
  );
};
