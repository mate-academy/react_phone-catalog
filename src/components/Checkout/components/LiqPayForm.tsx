import { useEffect, useRef } from 'react';
import {
  LIQPAY_CHECKOUT_URL,
  LIQPAY_MOCK_DATA_PREFIX,
} from '../constants/liqPayConfig';

interface LiqPayFormProps {
  data: string;
  signature: string;
}

export const LiqPayForm = ({ data, signature }: LiqPayFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const isMockData = data.startsWith(LIQPAY_MOCK_DATA_PREFIX);
    if (data && signature && !isMockData) {
      formRef.current?.submit();
    }
  }, [data, signature]);

  return (
    <form
      ref={formRef}
      method="POST"
      action={LIQPAY_CHECKOUT_URL}
      acceptCharset="utf-8"
      className="hidden"
    >
      <input
        type="hidden"
        name="data"
        value={data}
      />
      <input
        type="hidden"
        name="signature"
        value={signature}
      />
    </form>
  );
};
