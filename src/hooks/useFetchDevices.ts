import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/helperToolkit';
import { fetchDevicesList } from '../slices/deviceSlice';

export const useFetchDevices = (category: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (category) {
      dispatch(fetchDevicesList(category));
    }
  }, [category, dispatch]);
};
