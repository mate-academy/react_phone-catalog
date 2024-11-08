import { TProductBase } from '@utils/types/productBase.type';

export interface PhoneState {
  phones: TProductBase[];
  loading: boolean;
  error: string | undefined;
}

export interface TabletState {
  tablets: TProductBase[];
  loading: boolean;
  error: string | undefined;
}

export interface AccessoriesState {
  accessories: TProductBase[];
  loading: boolean;
  error: string | undefined;
}

export interface RootState {
  phone: PhoneState;
  tablets: TabletState;
  accessories: AccessoriesState;
}
