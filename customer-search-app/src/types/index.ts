export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';
export type AddressType = 'Home' | 'Business' | 'Mailing';
export type PhoneType = 'Mobile' | 'Home' | 'Work';
export type EmailType = 'Personal' | 'Work';

export interface Address {
  id: string;
  type: AddressType;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Phone {
  id: string;
  type: PhoneType;
  number: string;
  isPrimary: boolean;
}

export interface Email {
  id: string;
  type: EmailType;
  address: string;
  isPrimary: boolean;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: MaritalStatus;
  secureId: string;
  addresses: Address[];
  phones: Phone[];
  emails: Email[];
}

export type FieldType = 'text' | 'date' | 'select' | 'number' | 'email';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  renderOrder: number;
  width?: string;
}
