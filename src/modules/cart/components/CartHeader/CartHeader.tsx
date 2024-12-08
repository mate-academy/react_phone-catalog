import { useLocation, useNavigate } from 'react-router-dom';

import LeftIcon from '@assets/images/icons/chevron-left-icon.svg?react';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { TextButton } from '@shared/base/TextButton';

import styles from './CartHeader.module.scss';

export const CartHeader = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const onGoBack = () => {
    if (state?.from) {
      navigate(state.from);
    } else {
      navigate('/');
    }
  };

  return (
    <Box className={styles.header}>
      <TextButton startAdornment={LeftIcon} onClick={onGoBack}>
        Back
      </TextButton>

      <Text variant="h1">Cart</Text>
    </Box>
  );
};
