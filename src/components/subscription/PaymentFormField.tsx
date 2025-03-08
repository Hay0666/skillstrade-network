
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormFieldError from './FormFieldError';

interface PaymentFormFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  error?: string;
  disabled?: boolean;
  type?: string;
}

const PaymentFormField: React.FC<PaymentFormFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  error,
  disabled,
  type = 'text'
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={error ? 'border-destructive' : ''}
        disabled={disabled}
      />
      <FormFieldError error={error} />
    </div>
  );
};

export default PaymentFormField;
