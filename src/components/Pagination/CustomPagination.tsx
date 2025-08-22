import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';
import React from 'react';

type Props = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export const CustomPagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const { theme } = useTheme();

  // Створюємо Material-UI тему на основі поточної теми
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === 'dark' ? 'dark' : 'light',
          primary: {
            main: theme === 'dark' ? '#8B5CF6' : '#4219d0',
          },
          background: {
            default: theme === 'dark' ? '#181A1B' : '#FAFBFC',
            paper: theme === 'dark' ? '#23272A' : '#e2e6e9',
          },
          text: {
            primary: theme === 'dark' ? '#F3F3F3' : '#0F0F11',
            secondary: theme === 'dark' ? '#B4BDC3' : '#89939A',
          },
        },
        components: {
          MuiPaginationItem: {
            styleOverrides: {
              root: {
                borderColor: theme === 'dark' ? '#B4BDC3' : '#B4BDC3',
                color: theme === 'dark' ? '#F3F3F3' : '#0F0F11',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: theme === 'dark' ? '#F3F3F3' : '#0F0F11',
                  backgroundColor: theme === 'dark' ? '#23272A' : '#e2e6e9',
                },
                '&.Mui-selected': {
                  backgroundColor: theme === 'dark' ? '#8B5CF6' : '#4219d0',
                  borderColor: theme === 'dark' ? '#8B5CF6' : '#4219d0',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: theme === 'dark' ? '#8B5CF6' : '#4219d0',
                  },
                },
              },
            },
          },
        },
      }),
    [theme],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        siblingCount={1}
      />
    </ThemeProvider>
  );
};
