import { useGlobalData } from '@features/index';
import { useCheckout, useSteps } from '.';
import {
  CheckoutBody,
  Pickup,
  Shipment,
  UserDetails,
} from '@shared/api/types/bodies.types';
import { DeliveryTypes } from '@shared/api/types/bodies.enums';
import { post } from '@shared/api';

export const useSubmitRequest = () => {
  const { itemsInCart } = useGlobalData();
  const {
    filled,
    dataProcessingAgreement,
    userDetails,
    deliveryType,
    deliveryAddress,
    birthdayRef,
  } = useCheckout();
  const { setStep } = useSteps();

  const request: CheckoutBody = {
    cartItems: itemsInCart,
    userDetails: {} as UserDetails,
    deliveryDetails: {} as Pickup | Shipment,
    dataProcessingAgreement: false,
  };

  const formUD = () => {
    const ud = userDetails.current;
    const mainCheck = Object.values(ud).every(
      el => typeof el === 'string' && el.length > 0,
    );

    if (!mainCheck) {
      setStep(1);

      return false;
    }

    request.userDetails = ud;

    const bd = birthdayRef.current;
    const bdCheck = Object.values(bd).every(el => el !== 0);

    if (!bdCheck) {
      return true;
    }

    request.userDetails.birthday = bd;

    return true;
  };

  const formDD = () => {
    const dt = deliveryType.current;

    request.deliveryDetails.type = dt;
    if (dt === DeliveryTypes.PICKUP) {
      return true;
    }

    const { apartment, ...da } = deliveryAddress.current;
    const check = Object.values(da).every(
      el => typeof el === 'string' && el.length > 0,
    );

    if (!check) {
      setStep(2);

      return false;
    }

    (request.deliveryDetails as Shipment).deliveryAddress = da;

    if (
      !apartment ||
      !(typeof apartment === 'string') ||
      !(apartment.length > 0)
    ) {
      return true;
    }

    (request.deliveryDetails as Shipment).deliveryAddress.apartment = apartment;

    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arr = Object.values(filled);

    if (arr.some(el => el === false)) {
      const step = arr.indexOf(false) + 1;

      setStep(step);

      return;
    }

    const check = [formUD(), formDD(), dataProcessingAgreement.current];

    if (check.some(el => el === false)) {
      const step = check.indexOf(false) + 1;

      setStep(step);

      return;
    }

    post.checkout(request);
  };

  return { onSubmit };
};
