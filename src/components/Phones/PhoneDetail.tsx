import { FC } from 'react';
import { Phone } from '../../types/Phone';
import { Box } from '../../UI/Box';
// import { selectPhone } from '../../features/phoneDetail/phoneDetailSlice';
// import { useAppSelector } from '../../app/hooks';

type Props = {
  phone: Phone | null,
};

export const PhoneDetail: FC<Props> = ({ phone }) => {
  // const { } = phone;
  // const phone = useAppSelector(selectPhone);

  return (
    <Box>
      <h1>Page Detail</h1>
      <p>{phone?.name}</p>
    </Box>
  );
};
