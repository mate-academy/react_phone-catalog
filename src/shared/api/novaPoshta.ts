const API_KEY = import.meta.env.VITE_NOVA_POSHTA_API_KEY as string;
const API_URL = 'https://api.novaposhta.ua/v2.0/json/';

type NPResponse<T> = {
  success: boolean;
  data?: T[];
  errors?: string[];
  warnings?: string[];
};

export type CityOption = {
  Ref: string;
  Description: string;
  DescriptionRu?: string;
  SettlementTypeDescription?: string;
  AreaDescription?: string;
};

export type WarehouseOption = {
  Ref: string;
  Description: string;
  CityRef: string;
};

export type CreateOrderParams = {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  cityRef: string;
  warehouseRef: string;
  paymentMethod: string;
  cost: number;
};

type ContactPerson = {
  Ref: string;
  Phones?: string;
};

type Counterparty = {
  Ref: string;
  ContactPerson?: {
    data?: ContactPerson[];
  };
};

type InternetDocument = {
  IntDocNumber?: string;
};

async function requestNovaPoshta<T>(
  modelName: string,
  calledMethod: string,
  methodProperties: Record<string, unknown> = {},
): Promise<NPResponse<T>> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName,
      calledMethod,
      methodProperties,
    }),
  });

  if (!response.ok) {
    throw new Error(`Nova Poshta request failed (${response.status})`);
  }

  return (await response.json()) as NPResponse<T>;
}

function getApiError<T>(response: NPResponse<T>, fallback: string): string {
  return (
    response.errors?.join(', ') || response.warnings?.join(', ') || fallback
  );
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.startsWith('380')) return `0${digits.slice(3)}`;
  if (digits.length === 9) return `0${digits}`;

  return digits;
}

export async function fetchCities(search: string): Promise<CityOption[]> {
  const response = await requestNovaPoshta<CityOption>('Address', 'getCities', {
    FindByString: search,
    Limit: '20',
  });

  if (!response.success) {
    throw new Error(getApiError(response, 'Nova Poshta lookup failed'));
  }

  return response.data ?? [];
}

export async function fetchWarehouses(
  cityRef: string,
): Promise<WarehouseOption[]> {
  const response = await requestNovaPoshta<WarehouseOption>(
    'Address',
    'getWarehouses',
    { CityRef: cityRef },
  );

  if (!response.success) {
    throw new Error(getApiError(response, 'Nova Poshta lookup failed'));
  }

  return response.data ?? [];
}

async function getSenderInfo() {
  const senderResponse = await requestNovaPoshta<Counterparty>(
    'Counterparty',
    'getCounterparties',
    { CounterpartyProperty: 'Sender' },
  );

  const sender = senderResponse.data?.[0];

  if (!senderResponse.success || !sender?.Ref) {
    throw new Error(getApiError(senderResponse, 'Не знайдено відправника'));
  }

  const cityResponse = await requestNovaPoshta<CityOption>(
    'Address',
    'getCities',
    { FindByString: 'Київ', Limit: '20' },
  );

  const city = cityResponse.data?.find((item) => item.Description === 'Київ');

  if (!cityResponse.success || !city?.Ref) {
    throw new Error(getApiError(cityResponse, 'Не знайдено Київ'));
  }

  const warehouseResponse = await requestNovaPoshta<WarehouseOption>(
    'Address',
    'getWarehouses',
    {
      CityRef: city.Ref,
      FindByString: 'Пирогівський шлях, 135',
    },
  );

  const warehouse = warehouseResponse.data?.find((item) =>
    item.Description.includes('Пирогівський шлях, 135'),
  );

  if (!warehouseResponse.success || !warehouse?.Ref) {
    throw new Error(
      getApiError(warehouseResponse, 'Не знайдено відділення відправника'),
    );
  }

  const contactsResponse = await requestNovaPoshta<ContactPerson>(
    'Counterparty',
    'getCounterpartyContactPersons',
    { Ref: sender.Ref },
  );

  const contact = sender.ContactPerson?.data?.[0] ?? contactsResponse.data?.[0];

  if (!contactsResponse.success || !contact?.Ref) {
    throw new Error(
      getApiError(contactsResponse, 'Не знайдено контакт відправника'),
    );
  }

  return {
    senderRef: sender.Ref,
    senderCityRef: city.Ref,
    senderAddressRef: warehouse.Ref,
    contactSenderRef: contact.Ref,
    sendersPhone: normalizePhone(contact.Phones ?? ''),
  };
}

async function createRecipient(params: CreateOrderParams) {
  const phone = normalizePhone(params.phone);

  const response = await requestNovaPoshta<Counterparty>(
    'Counterparty',
    'save',
    {
      CounterpartyProperty: 'Recipient',
      CounterpartyType: 'PrivatePerson',
      CityRef: params.cityRef,
      FirstName: params.firstName.trim(),
      MiddleName: params.middleName?.trim() ?? '',
      LastName: params.lastName.trim(),
      Phone: phone,
      Email: params.email.trim(),
    },
  );

  const recipient = response.data?.[0];

  if (!response.success || !recipient?.Ref) {
    throw new Error(getApiError(response, 'Не вдалося створити отримувача'));
  }

  let contact = recipient.ContactPerson?.data?.[0];

  if (!contact?.Ref) {
    const contacts = await requestNovaPoshta<ContactPerson>(
      'Counterparty',
      'getCounterpartyContactPersons',
      { Ref: recipient.Ref },
    );

    if (!contacts.success) {
      throw new Error(getApiError(contacts, 'Не вдалося отримати контакт'));
    }

    contact = contacts.data?.[0];
  }

  if (!contact?.Ref) {
    const contactResponse = await requestNovaPoshta<ContactPerson>(
      'ContactPerson',
      'save',
      {
        CounterpartyRef: recipient.Ref,
        FirstName: params.firstName.trim(),
        MiddleName: params.middleName?.trim() ?? '',
        LastName: params.lastName.trim(),
        Phone: phone,
        Email: params.email.trim(),
      },
    );

    contact = contactResponse.data?.[0];

    if (!contactResponse.success || !contact?.Ref) {
      throw new Error(
        getApiError(contactResponse, 'Не вдалося створити контакт отримувача'),
      );
    }
  }

  return {
    recipientRef: recipient.Ref,
    contactRecipientRef: contact.Ref,
    phone,
  };
}

export async function createNewPostDocument(
  params: CreateOrderParams,
): Promise<
  { success: true; enNumber: string } | { success: false; errors: string[] }
> {
  try {
    const [sender, recipient] = await Promise.all([
      getSenderInfo(),
      createRecipient(params),
    ]);

    const response = await requestNovaPoshta<InternetDocument>(
      'InternetDocument',
      'save',
      {
        Sender: sender.senderRef,
        CitySender: sender.senderCityRef,
        SenderAddress: sender.senderAddressRef,
        ContactSender: sender.contactSenderRef,
        SendersPhone: sender.sendersPhone,

        Recipient: recipient.recipientRef,
        ContactRecipient: recipient.contactRecipientRef,
        CityRecipient: params.cityRef,
        RecipientAddress: params.warehouseRef,
        RecipientsPhone: recipient.phone,

        PayerType: 'Recipient',
        PaymentMethod: 'Cash',
        CargoType: 'Cargo',
        Weight: '0.5',
        SeatsAmount: '1',
        ServiceType: 'WarehouseWarehouse',
        Cost: String(params.cost),
        Description: 'Замовлення інтернет-магазину',
        DateTime: new Date().toLocaleDateString('uk-UA'),
      },
    );

    const document = response.data?.[0];

    if (!response.success || !document?.IntDocNumber) {
      return {
        success: false,
        errors: [getApiError(response, 'Нова Пошта не повернула номер ТТН')],
      };
    }

    return { success: true, enNumber: document.IntDocNumber };
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Невідома помилка'],
    };
  }
}
