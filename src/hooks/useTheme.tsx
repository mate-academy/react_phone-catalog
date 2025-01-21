import { useAppSelector } from '../store/hooks';

export const useTheme = () => {
  return useAppSelector(state => state.theme.isDark);
};
