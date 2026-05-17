import { supabase } from './supabaseClient';

export interface City {
  Ref: string;
  Description: string;
}

export interface Warehouse {
  Ref: string;
  Description: string;
  Number: string;
  Phone?: string;
}

interface NovaPostaResponse<T> {
  success: boolean;
  data: T[];
  errors?: string[];
  warningsCodes?: string[];
}

// ======================
// 🔥 Виклик Edge Function
// ======================

async function callNovaPostaAPI<T>(
  method: string,
  properties: Record<string, unknown>,
): Promise<NovaPostaResponse<T>> {
  const { data, error } = await supabase.functions.invoke(
    'get-nova-poshta-data',
    {
      body: { method, properties },
    },
  );

  if (error) {
    console.error('Edge Function error:', error);
    throw error;
  }

  if (!data) {
    throw new Error('Empty response from Edge Function');
  }

  return data as NovaPostaResponse<T>;
}

// ======================
// 📍 Отримати міста
// ======================

export async function getCities(): Promise<City[]> {
  try {
    const response = await callNovaPostaAPI<City>('getCities', {});

    console.log('NOVA RESPONSE:', response); // 👈 ДОДАЙ ЦЕ

    if (!response.success) {
      console.error(response.errors);
      return [];
    }

    return response.data ?? [];
  } catch (error) {
    console.error('getCities error:', error);
    return [];
  }
}

// ======================
// 📦 Отримати відділення
// ======================

interface GetWarehouses {
  cityRef: string;
  language?: 'UA' | 'RU';
  pageSize?: string;
  page?: string;
}

export async function getWarehouses(
  params: GetWarehouses,
): Promise<Warehouse[]> {
  try {
    const response = await callNovaPostaAPI<Warehouse>('getWarehouses', {
      CityRef: params.cityRef,
      Language: params.language ?? 'UA',
      Page: params.page ?? '1',
      Limit: params.pageSize ?? '100',
    });

    if (!response.success) {
      console.error(response.errors);
      return [];
    }

    return response.data ?? [];
  } catch (error) {
    console.error('getWarehouses error:', error);
    return [];
  }
}

// ======================
// 💰 Вартість доставки
// ======================

interface GetDeliveryPrice {
  citySenderRef: string;
  cityRecipientRef: string;
  serviceType?: string;
}

export async function getDeliveryPrice(params: GetDeliveryPrice): Promise<{
  Cost: string;
  EstimatedDeliveryDate: string;
}> {
  try {
    const response = await callNovaPostaAPI<{
      Cost: string;
      EstimatedDeliveryDate: string;
    }>('getDocumentPrice', {
      CitySender: params.citySenderRef,
      CityRecipient: params.cityRecipientRef,
      Weight: '0.5',
      ServiceType: params.serviceType ?? 'WarehouseWarehouse',
      CargoType: 'Cargo',
      Cost: '500',
    });

    if (!response.success) {
      console.error(response.errors);
      return { Cost: '0', EstimatedDeliveryDate: '—' };
    }

    const result = response.data?.[0];

    return result ?? { Cost: '0', EstimatedDeliveryDate: '—' };
  } catch (error) {
    console.error('getDeliveryPrice error:', error);
    return { Cost: '0', EstimatedDeliveryDate: '—' };
  }
}
