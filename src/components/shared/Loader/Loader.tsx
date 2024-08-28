import { useContext } from 'react';
import { CircularProgress, Box } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import { GlobalContext } from '../../shared/GlobalContext/GlobalContext';

export const Loader = () => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      position="relative"
    >
      <CircularProgress />
      <AppleIcon
        sx={{
          position: 'absolute',
          color: isSunSelected ? 'black' : 'white',
          width: '18px',
        }}
      />
    </Box>
  );
};
