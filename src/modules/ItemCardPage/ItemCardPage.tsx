import { useParams } from 'react-router-dom';
import CardDescription from './components/CardDescription/CardDescription';
import CardDetails from './components/CardDetails/CardDetails';
import MayAlsoLike from './components/MayAlsoLike/MayAlsoLike';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { useEffect } from 'react';
import { setDevice } from '../../features/currentDevice/currentDeviceSlice';
import { Device } from '../../types/Device';

const ItemCardPage = () => {
  const dispatch = useAppDispatch();
  const phones = useAppSelector(state => state.phones.listOfPhones);
  const tablets = useAppSelector(state => state.tablets.listOfTablets);
  const accessories = useAppSelector(
    state => state.accessories.listOfAccessories,
  );
  const { deviceId } = useParams();
  const allDevices: Device[] = [...phones, ...tablets, ...accessories];

  const device = allDevices.find(el => el.id === deviceId) || null;

  useEffect(() => {
    dispatch(setDevice(device));
  }, [device, dispatch]);

  return (
    <>
      {device ? (
        <>
          {' '}
          <CardDetails />
          <CardDescription />
          <MayAlsoLike />
        </>
      ) : (
        <h1>No such a device</h1>
      )}
    </>
  );
};

export default ItemCardPage;
