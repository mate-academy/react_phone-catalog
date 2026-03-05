import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { CheckoutFormValues } from '../helpers/checkoutSchema';
import { checkoutSchema } from '../helpers/checkoutSchema';
import { COUNTRIES } from '../constants/countries';
import { FieldError } from './FieldError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TYPOGRAPHY } from '@/constants/typography';
import { showError } from '@/lib/toast';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isLoading?: boolean;
}

export const CheckoutForm = ({ onSubmit, isLoading }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(checkoutSchema) });

  const handleFormSubmit = handleSubmit(onSubmit, () =>
    showError(t('toast.validationError')),
  );

  const handleCountryChange = (value: string) => {
    setValue('country', value, { shouldValidate: true });
  };

  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col gap-5">
        <p className={`${TYPOGRAPHY.uppercase} text-foreground`}>
          {t('login.contactInfo')}
        </p>

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">{t('login.firstName')}</Label>
            <Input
              id="firstName"
              placeholder={t('login.firstNamePlaceholder')}
              className={errors.firstName ? 'border-destructive' : ''}
              {...register('firstName')}
            />
            <FieldError message={errors.firstName?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName">{t('login.lastName')}</Label>
            <Input
              id="lastName"
              placeholder={t('login.lastNamePlaceholder')}
              className={errors.lastName ? 'border-destructive' : ''}
              {...register('lastName')}
            />
            <FieldError message={errors.lastName?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={errors.email ? 'border-destructive' : ''}
            {...register('email')}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">{t('login.phone')}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+380 xx xxx xx xx"
            className={errors.phone ? 'border-destructive' : ''}
            {...register('phone')}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className={`${TYPOGRAPHY.uppercase} text-foreground`}>
          {t('login.deliveryAddress')}
        </p>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address">{t('login.StreetAddress')}</Label>
          <Input
            id="address"
            placeholder={t('login.StreetAddressPlaceholder')}
            className={errors.address ? 'border-destructive' : ''}
            {...register('address')}
          />
          <FieldError message={errors.address?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="city">{t('login.city')}</Label>
            <Input
              id="city"
              placeholder={t('login.Kyiv')}
              className={errors.city ? 'border-destructive' : ''}
              {...register('city')}
            />
            <FieldError message={errors.city?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="zip">{t('login.ZIP')}</Label>
            <Input
              id="zip"
              placeholder="01001"
              className={errors.zip ? 'border-destructive' : ''}
              {...register('zip')}
            />
            <FieldError message={errors.zip?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>{t('login.country')}</Label>
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger
              className={errors.country ? 'border-destructive' : ''}
            >
              <SelectValue placeholder={t('login.countryPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.country?.message} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={`h-14 ${TYPOGRAPHY.uppercase}`}
      >
        {isLoading ?
          <Loader2 className="w-5 h-5 animate-spin" />
        : t('login.proceedPayment')}
      </Button>
    </form>
  );
};
