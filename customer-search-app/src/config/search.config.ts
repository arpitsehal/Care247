import { FieldConfig } from '@/types';

export const searchFields: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    renderOrder: 1,
    width: 'w-full md:w-1/3',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    renderOrder: 2,
    width: 'w-full md:w-1/3',
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    placeholder: 'Select date',
    renderOrder: 3,
    width: 'w-full md:w-1/3',
  },
];

export const resultsFields: FieldConfig[] = [
  {
    name: 'fullName',
    label: 'Name',
    type: 'text',
    renderOrder: 1,
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    renderOrder: 2,
  },
  {
    name: 'primaryPhone',
    label: 'Primary Phone',
    type: 'text',
    renderOrder: 3,
  },
  {
    name: 'primaryEmail',
    label: 'Primary Email',
    type: 'email',
    renderOrder: 4,
  },
];
