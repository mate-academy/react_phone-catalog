import React from 'react';
import { useTranslation } from 'react-i18next';
import type { StepDeliveryProps } from '../CheckoutModal.types';

export const StepDelivery: React.FC<StepDeliveryProps> = ({
  styles,
  arrowDownIcon,
  deliveryOpen,
  deliveryMethod,
  address,
  cityQuery,
  loadingCities,
  citiesOpen,
  filteredCities,
  selectedCity,
  loadingWarehouses,
  warehousesOpen,
  warehouses,
  selectedWarehouse,
  isStep2Valid,
  onToggleDelivery,
  onSelectHome,
  onSelectNovaPoshta,
  onAddressChange,
  onCityFocus,
  onCityBlur,
  onCityQueryChange,
  onSelectCity,
  onToggleWarehouses,
  onSelectWarehouse,
  onContinue,
  onBack,
  normalizeWarehouseText,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.stepContent}>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={styles.dropdown__button}
          onClick={onToggleDelivery}
        >
          {deliveryMethod === 'home' ?
            t('checkout.home_address')
          : 'Nova Poshta'}
          <span className={styles._arrow}>
            <img
              alt="arrow"
              src={arrowDownIcon}
            />
          </span>
        </button>

        {deliveryOpen && (
          <div className={styles.dropdown__list}>
            <div
              className={styles.dropdown__item}
              onClick={onSelectHome}
            >
              {t('checkout.home_address')}
            </div>
            <div
              className={styles.dropdown__item}
              onClick={onSelectNovaPoshta}
            >
              Nova Poshta
            </div>
          </div>
        )}
      </div>

      {deliveryMethod === 'home' && (
        <input
          className={styles.input}
          placeholder={t('checkout.address_placeholder')}
          value={address}
          maxLength={40}
          onChange={(e) =>
            onAddressChange(e.target.value.replace(/\s{2,}/g, ' ').slice(0, 40))
          }
        />
      )}

      {deliveryMethod === 'novapost' && (
        <>
          <div className={styles.dropdown}>
            <input
              className={styles.input}
              placeholder={t('checkout.pickup_placeholder')}
              value={cityQuery}
              disabled={loadingCities}
              onFocus={onCityFocus}
              onBlur={onCityBlur}
              onChange={(e) => onCityQueryChange(e.target.value)}
            />
            {loadingCities && (
              <div className={styles.loadingHint}>{t('auth.loading')}</div>
            )}
            {!loadingCities && citiesOpen && filteredCities.length > 0 && (
              <div
                className={styles.dropdown__list}
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                {filteredCities.map((city) => (
                  <div
                    key={city.Ref}
                    className={styles.dropdown__item}
                    onClick={() => onSelectCity(city)}
                  >
                    {city.Description}
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedCity && (
            <div className={styles.dropdown}>
              <button
                type="button"
                className={styles.dropdown__button}
                disabled={loadingWarehouses}
                onClick={onToggleWarehouses}
              >
                {loadingWarehouses ?
                  t('auth.loading')
                : selectedWarehouse ?
                  `№${selectedWarehouse.Number} — ${normalizeWarehouseText(selectedWarehouse.Description)}`
                : t('checkout.pickup_placeholder')}
                {!loadingWarehouses && (
                  <span className={styles._arrow}>
                    <img
                      alt="arrow"
                      src={arrowDownIcon}
                    />
                  </span>
                )}
              </button>
              {warehousesOpen && warehouses.length > 0 && (
                <div
                  className={styles.dropdown__list}
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  {warehouses.map((w) => (
                    <div
                      key={w.Ref}
                      className={styles.dropdown__item}
                      onClick={() => onSelectWarehouse(w)}
                    >
                      {normalizeWarehouseText(w.Description)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={onContinue}
        disabled={!isStep2Valid}
      >
        {t('checkout.continue')}
      </button>
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={onBack}
      >
        {t('checkout.back')}
      </button>
    </div>
  );
};
