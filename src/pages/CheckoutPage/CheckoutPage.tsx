import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCartStore } from '@/entities/cart';
import { useProductByIds } from '@/entities/product';

import { BackButton } from '@/components/molecules';
import { Typography } from '@/components/atoms';

import {
  fetchCities,
  fetchWarehouses,
  createNewPostDocument,
} from '@/shared/api/novaPoshta';
import type { CityOption, WarehouseOption } from '@/shared/api/novaPoshta';
import { sendEmail } from '@/shared/api/sendEmail';
import { updateTopSales } from '@/shared/api/topsales';

import { useUsdToUahRate } from '@/shared/hooks/useUsdToUahRate';
import { useCurrencyStore } from '@/shared/store/useCurrencyStore';
import { formatPrice } from '@/shared/lib/formatPrice';

import type { Order } from '@/shared/types/Order';

import styles from './CheckoutPage.module.scss';
import { transliterate } from './Transliterate';
import { CheckoutSuccessModal } from './CheckoutSuccessModal';

export const CheckoutPage = () => {
  const { t } = useTranslation();

  const { data: exchangeRate } = useUsdToUahRate();
  const currency = useCurrencyStore((state) => state.currency);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [successTtn, setSuccessTtn] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState(() => {
    const defaults = {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: localStorage.getItem('userEmail') || '',
      deliveryType: 'nova_poshta_branch',
      city: '',
      cityRef: '',
      warehouse: '',
      paymentMethod: 'cash_upon_receipt',
    };

    try {
      const saved = localStorage.getItem('checkoutFormData');

      if (!saved) {
        return defaults;
      }

      const parsed: unknown = JSON.parse(saved);

      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return defaults;
      }

      const values = parsed as Record<string, unknown>;

      return {
        ...defaults,
        firstName: typeof values.firstName === 'string' ? values.firstName : '',
        lastName: typeof values.lastName === 'string' ? values.lastName : '',
        middleName:
          typeof values.middleName === 'string' ? values.middleName : '',
        phone: typeof values.phone === 'string' ? values.phone : '',
        email: typeof values.email === 'string' ? values.email : defaults.email,
        deliveryType:
          typeof values.deliveryType === 'string' ?
            values.deliveryType
          : defaults.deliveryType,
        paymentMethod:
          typeof values.paymentMethod === 'string' ?
            values.paymentMethod
          : defaults.paymentMethod,
      };
    } catch {
      return defaults;
    }
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isCityListOpen, setIsCityListOpen] = useState(false);
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [isWarehouseListOpen, setIsWarehouseListOpen] = useState(false);
  const [isWarehousesLoading, setIsWarehousesLoading] = useState(false);
  const cityFieldRef = useRef<HTMLDivElement>(null);
  const warehouseFieldRef = useRef<HTMLDivElement>(null);
  const deferredWarehouseSearch = useDeferredValue(warehouseSearch);

  const visibleWarehouses = useMemo(() => {
    if (!isWarehouseListOpen) return [];

    const query = deferredWarehouseSearch.trim().toLocaleLowerCase();
    const result: WarehouseOption[] = [];

    for (const warehouse of warehouses) {
      if (!query || warehouse.Description.toLocaleLowerCase().includes(query)) {
        result.push(warehouse);
        if (result.length === 40) break;
      }
    }

    return result;
  }, [warehouses, deferredWarehouseSearch, isWarehouseListOpen]);
  const [deliveryLookupError, setDeliveryLookupError] = useState(false);
  const cityRequestId = useRef(0);
  const warehouseRequestId = useRef(0);

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    data: cartProducts = [],
    isPending: isProductsPending,
    isError: isProductsError,
  } = useProductByIds(cartItems.map((item) => item.productId));

  const productsById = new Map(
    cartProducts.map((product) => [product.id, product]),
  );
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (productsById.get(item.productId)?.price ?? 0) * item.quantity,
    0,
  );
  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Checkout | NICE GADGETS';
  }, []);

  useEffect(() => {
    if (!isCityListOpen && !isWarehouseListOpen) return;

    const closeCityResults = () => {
      ++cityRequestId.current;
      setIsCityListOpen(false);
    };

    const handleOutsidePointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;

      if (!cityFieldRef.current?.contains(event.target)) {
        closeCityResults();
      }

      if (!warehouseFieldRef.current?.contains(event.target)) {
        setIsWarehouseListOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCityResults();
        setIsWarehouseListOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointer);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointer);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isCityListOpen, isWarehouseListOpen]);

  useEffect(() => {
    if (cartItems.length === 0 && !successTtn) {
      navigate('/', { replace: true });
    }
  }, [cartItems.length, navigate, successTtn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleCityInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const requestId = ++cityRequestId.current;
    ++warehouseRequestId.current;

    setDeliveryLookupError(false);
    setFormData((prev) => ({
      ...prev,
      city: value,
      cityRef: '',
      warehouse: '',
    }));
    setWarehouses([]);
    setWarehouseSearch('');
    setIsWarehouseListOpen(false);
    setIsWarehousesLoading(false);
    setCities([]);
    setIsCityListOpen(Boolean(value.trim().length >= 2));

    if (errors.city || errors.warehouse) {
      setErrors((prev) => ({ ...prev, city: false, warehouse: false }));
    }

    if (value.trim().length < 2) return;

    try {
      const result = await fetchCities(transliterate(value));
      if (requestId === cityRequestId.current) {
        setCities(result);
        setIsCityListOpen(true);
      }
    } catch (error) {
      if (requestId === cityRequestId.current) {
        setDeliveryLookupError(true);
        console.error('City lookup failed:', error);
      }
    }
  };

  const reopenCityResults = async () => {
    const search = formData.city.trim();
    if (search.length < 2) return;

    setIsCityListOpen(true);
    if (cities.length > 0 || formData.cityRef) return;

    const requestId = ++cityRequestId.current;
    try {
      const result = await fetchCities(transliterate(search));
      if (requestId === cityRequestId.current) setCities(result);
    } catch (error) {
      if (requestId === cityRequestId.current) {
        setDeliveryLookupError(true);
        console.error('City lookup failed:', error);
      }
    }
  };

  const handleSelectCity = async (cityItem: CityOption) => {
    ++cityRequestId.current;
    const requestId = ++warehouseRequestId.current;

    setDeliveryLookupError(false);
    setFormData((prev) => ({
      ...prev,
      city: cityItem.Description,
      cityRef: cityItem.Ref,
      warehouse: '',
    }));
    setCities([]);
    setIsCityListOpen(false);
    setWarehouses([]);
    setWarehouseSearch('');
    setIsWarehouseListOpen(false);
    setIsWarehousesLoading(true);

    try {
      const warehouseList = await fetchWarehouses(cityItem.Ref);
      if (requestId === warehouseRequestId.current) {
        setWarehouses(warehouseList);
      }
    } catch (error) {
      if (requestId === warehouseRequestId.current) {
        setDeliveryLookupError(true);
        console.error('Warehouse lookup failed:', error);
      }
    } finally {
      if (requestId === warehouseRequestId.current) {
        setIsWarehousesLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittingRef.current || cartItems.length === 0) {
      return;
    }

    setSubmitError(null);

    if (
      isProductsPending ||
      isProductsError ||
      cartProducts.length !== cartItems.length
    ) {
      setSubmitError(t('orderProcessingError'));
      return;
    }

    const newErrors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      phone:
        !formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 12,
      email: !formData.email.trim(),
      city: !formData.city.trim() || !formData.cityRef,
      warehouse: !formData.warehouse.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const {
        firstName,
        lastName,
        middleName,
        phone,
        email,
        deliveryType,
        paymentMethod,
      } = formData;

      localStorage.setItem(
        'checkoutFormData',
        JSON.stringify({
          firstName,
          lastName,
          middleName,
          phone,
          email,
          deliveryType,
          paymentMethod,
        }),
      );
      localStorage.setItem('userEmail', formData.email);

      if (!exchangeRate || exchangeRate <= 0) {
        setSubmitError(
          'Unable to retrieve the exchange rate. Please try again later.',
        );
        return;
      }

      const result = await createNewPostDocument({
        firstName: transliterate(formData.firstName),
        lastName: transliterate(formData.lastName),
        middleName: transliterate(formData.middleName),
        phone: formData.phone,
        email: formData.email,
        cityRef: formData.cityRef,
        warehouseRef: formData.warehouse,
        paymentMethod: formData.paymentMethod,
        cost: 100,
      });

      if (!result.success) {
        setSubmitError(t('errorCreatingWaybill'));
        return;
      }

      try {
        await Promise.all(
          cartItems.map((item) =>
            updateTopSales(item.productId, item.quantity),
          ),
        );
      } catch (error) {
        console.error('Failed to update top sales:', error);
      }

      const order: Order = {
        id: crypto.randomUUID(),
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        ttn: result.enNumber,
      };

      const savedOrders: Order[] = JSON.parse(
        localStorage.getItem('orderHistory') || '[]',
      );

      localStorage.setItem(
        'orderHistory',
        JSON.stringify([...savedOrders, order]),
      );

      try {
        await sendEmail({
          email: formData.email,
          message: `Dear ${formData.firstName} ${formData.lastName},

Thank you for your order!

Your order has been successfully placed.

Tracking number (TTN): ${result.enNumber}
City: ${formData.city}
Nova Poshta branch: ${
            warehouses.find((wh) => wh.Ref === formData.warehouse)
              ?.Description || 'Not specified'
          }
Total amount: ${formatPrice(totalAmount, exchangeRate, currency)}

Thank you for shopping with NICE GADGETS!

Best regards,
NICE GADGETS Team`,
        });
      } catch (error) {
        console.error('Email sending error:', error);
      }

      setSuccessTtn(result.enNumber);

      clearCart();
      localStorage.removeItem('shopping-cart');
    } catch (error) {
      console.error('Order processing error:', error);
      setSubmitError(t('orderProcessingError'));
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Typography
        variant="h1"
        className={styles.title}
      >
        {t('checkoutOrdering')}
      </Typography>

      <BackButton
        fallback="/"
        className={styles.backButton}
      >
        {t('back')}
      </BackButton>

      <form
        onSubmit={handleSubmit}
        className={styles.formCard}
      >
        <div className={styles.section}>
          <Typography
            variant="h3"
            className={styles.subtitle}
          >
            {t('checkoutContactDetails')}
          </Typography>

          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>{t('checkoutFirstName')} *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? styles.errorInput : ''}
                aria-label="Enter first name"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>{t('checkoutLastName')} *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? styles.errorInput : ''}
                aria-label="Enter last name"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>{t('checkoutMiddleName')}</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              aria-label="Enter middle name"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>{t('checkoutMobilePhone')} *</label>
            <div className={styles.phoneInput}>
              <span>+380</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone.replace('+380', '')}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 9);

                  setFormData((prev) => ({
                    ...prev,
                    phone: `+380${digits}`,
                  }));

                  if (errors.phone) {
                    setErrors((prev) => ({ ...prev, phone: false }));
                  }
                }}
                placeholder="XXXXXXXXX"
                className={errors.phone ? styles.errorInput : ''}
                aria-label="Enter mobile phone number"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>{t('checkoutEmail')} *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={errors.email ? styles.errorInput : ''}
              aria-label="Enter email address"
            />
          </div>
        </div>

        <div className={styles.section}>
          <Typography
            variant="h3"
            className={styles.subtitle}
          >
            {t('checkoutDelivery')}
          </Typography>

          <div
            ref={cityFieldRef}
            className={`${styles.fieldGroup} ${styles.relativeContainer}`}
          >
            <label>{t('checkoutCity')} *</label>
            <input
              type="text"
              name="city"
              placeholder={t('checkoutCityPlaceholder')}
              value={formData.city}
              onChange={handleCityInput}
              onFocus={reopenCityResults}
              onClick={reopenCityResults}
              autoComplete="off"
              className={errors.city ? styles.errorInput : ''}
              aria-label="Enter city"
              aria-expanded={isCityListOpen && cities.length > 0}
            />

            {isCityListOpen && cities.length > 0 && (
              <ul className={styles.dropdownList}>
                {cities.map((item) => (
                  <li key={item.Ref}>
                    <button
                      type="button"
                      onClick={() => handleSelectCity(item)}
                      className={styles.dropdownItem}
                    >
                      {item.Description}{' '}
                      {item.AreaDescription ?
                        `(${item.AreaDescription} обл.)`
                      : ''}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {deliveryLookupError && (
            <p
              className={styles.errorText}
              role="alert"
            >
              {t('checkoutLocationLookupError')}
            </p>
          )}

          <div
            ref={warehouseFieldRef}
            className={`${styles.fieldGroup} ${styles.relativeContainer}`}
          >
            <label htmlFor="checkout-warehouse">{t('checkoutBranch')} *</label>

            <input
              id="checkout-warehouse"
              type="text"
              autoComplete="off"
              value={warehouseSearch}
              disabled={!formData.cityRef || isWarehousesLoading}
              placeholder={
                !formData.cityRef ? t('checkoutSelectCityFirst')
                : isWarehousesLoading ?
                  'Loading branches...'
                : t('checkoutSelectBranch')
              }
              aria-label={t('checkoutBranch')}
              aria-expanded={isWarehouseListOpen}
              className={errors.warehouse ? styles.errorInput : ''}
              onFocus={() => {
                if (warehouses.length > 0) setIsWarehouseListOpen(true);
              }}
              onClick={() => {
                if (warehouses.length > 0) setIsWarehouseListOpen(true);
              }}
              onChange={(event) => {
                setWarehouseSearch(event.target.value);
                setFormData((prev) => ({ ...prev, warehouse: '' }));
                setIsWarehouseListOpen(true);
                if (errors.warehouse) {
                  setErrors((prev) => ({ ...prev, warehouse: false }));
                }
              }}
            />

            {isWarehouseListOpen && warehouses.length > 0 && (
              <ul className={styles.dropdownList}>
                {visibleWarehouses.length > 0 ?
                  visibleWarehouses.map((warehouse) => (
                    <li key={warehouse.Ref}>
                      <button
                        type="button"
                        className={styles.dropdownItem}
                        onClick={() => {
                          setWarehouseSearch(warehouse.Description);
                          setFormData((prev) => ({
                            ...prev,
                            warehouse: warehouse.Ref,
                          }));
                          setIsWarehouseListOpen(false);
                          setErrors((prev) => ({ ...prev, warehouse: false }));
                        }}
                      >
                        {warehouse.Description}
                      </button>
                    </li>
                  ))
                : <li className={styles.dropdownItem}>No branches found</li>}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <Typography
            variant="h3"
            className={styles.subtitle}
          >
            {t('checkoutOrderSummary')}
          </Typography>

          <div className={styles.amount}>
            <p>{t('checkoutTotalItems', { count: totalCount })}</p>

            <Typography variant="h2">
              {formatPrice(totalAmount, exchangeRate, currency)}
            </Typography>
          </div>
        </div>

        {submitError && (
          <div
            className={styles.submitError}
            role="alert"
          >
            <span
              className={styles.submitErrorIcon}
              aria-hidden="true"
            >
              !
            </span>
            <p>{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('checkoutProcessing') : t('checkoutConfirmOrder')}
        </button>
      </form>

      {successTtn && (
        <CheckoutSuccessModal
          ttn={successTtn}
          onContinue={() => {
            setSuccessTtn(null);
            navigate('/');
          }}
        />
      )}
    </div>
  );
};
