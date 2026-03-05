import { httpsCallable } from 'firebase/functions';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import type { Order, CreateOrderPayload } from '../types/Order';
import { auth, firestore, functions } from '@/firebase/firebase';

type CallableFunctionError = {
  message?: string;
  code?: string;
  details?: unknown;
};

const extractFunctionErrorMessage = (error: unknown): string => {
  if (!error || typeof error !== 'object') {
    return 'Unknown payment error';
  }

  const fnError = error as CallableFunctionError;

  if (
    typeof fnError.details === 'object' &&
    fnError.details !== null &&
    'message' in fnError.details
  ) {
    const detailsMessage = (fnError.details as { message?: unknown }).message;
    if (typeof detailsMessage === 'string' && detailsMessage.trim()) {
      return detailsMessage;
    }
  }

  if (typeof fnError.message === 'string' && fnError.message.trim()) {
    return fnError.message;
  }

  return 'Unknown payment error';
};

const docToOrder = (id: string, data: Record<string, unknown>): Order => ({
  id,
  createdAt: data.createdAt as string,
  status: data.status as Order['status'],
  paymentMethod: data.paymentMethod as Order['paymentMethod'],
  customer: data.customer as Order['customer'],
  items: data.items as Order['items'],
  subtotal: data.subtotal as number,
  discount: data.discount as number | undefined,
  total: data.total as number,
  userId: data.userId as string | undefined,
  invoiceUrl: data.invoiceUrl as string | undefined,
});

export const createOrder = async (
  payload: CreateOrderPayload,
): Promise<Order> => {
  const fn = httpsCallable<CreateOrderPayload, Order>(functions, 'createOrder');
  try {
    const result = await fn(payload);
    return result.data;
  } catch (error) {
    throw new Error(extractFunctionErrorMessage(error));
  }
};

export const getOrder = async (orderId: string): Promise<Order | null> => {
  const ref = doc(firestore, 'orders', orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return docToOrder(snap.id, snap.data());
};

export const getUserOrders = async (): Promise<Order[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(firestore, 'orders'),
    where('userId', '==', user.uid),
    orderBy('createdAt', 'desc'),
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => docToOrder(d.id, d.data()));
};

export const saveOrderDiscount = async (
  orderId: string,
  discount: number,
): Promise<void> => {
  const ref = doc(firestore, 'orders', orderId);
  await updateDoc(ref, { discount });
};

export const createStripeIntent = async (
  orderId: string,
  amount: number,
): Promise<{ clientSecret: string }> => {
  const fn = httpsCallable<
    { orderId: string; amount: number },
    { clientSecret: string }
  >(functions, 'createStripeIntent');
  try {
    const result = await fn({ orderId, amount });
    return result.data;
  } catch (error) {
    throw new Error(extractFunctionErrorMessage(error));
  }
};

export const getLiqPayPayload = async (
  orderId: string,
  amount: number,
): Promise<{ data: string; signature: string }> => {
  const fn = httpsCallable<
    { orderId: string; amount: number },
    { data: string; signature: string }
  >(functions, 'getLiqPayPayload');
  try {
    const result = await fn({ orderId, amount });
    return result.data;
  } catch (error) {
    throw new Error(extractFunctionErrorMessage(error));
  }
};
