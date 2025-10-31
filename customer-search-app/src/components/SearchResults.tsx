import React from 'react';
import { Customer, FieldConfig, Address, Phone, Email } from '@/types';

interface SearchResultsProps {
  customers: Customer[];
  fields: FieldConfig[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ customers, fields }) => {
  const getCustomerFieldValue = (customer: Customer, fieldName: string) => {
    switch (fieldName) {
      case 'fullName':
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {customer.firstName[0]}{customer.lastName[0]}
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {customer.firstName} {customer.lastName}
              </div>
              <div className="text-sm text-gray-500">ID: {customer.secureId}</div>
            </div>
          </div>
        );
      case 'primaryPhone':
        const primaryPhone = customer.phones.find(phone => phone.isPrimary);
        return primaryPhone ? (
          <a href={`tel:${primaryPhone.number.replace(/\D/g, '')}`} className="text-blue-600 hover:text-blue-800">
            {primaryPhone.number}
          </a>
        ) : 'N/A';
      case 'primaryEmail':
        const primaryEmail = customer.emails.find(email => email.isPrimary);
        return primaryEmail ? (
          <a href={`mailto:${primaryEmail.address}`} className="text-blue-600 hover:text-blue-800">
            {primaryEmail.address}
          </a>
        ) : 'N/A';
      case 'dateOfBirth':
        const dob = customer.dateOfBirth;
        if (!dob) return 'N/A';
        try {
          const birthDate = new Date(dob);
          return (
            <div>
              <div className="text-sm text-gray-900">
                {birthDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
              <div className="text-xs text-gray-500">
                {calculateAge(dob)} years old
              </div>
            </div>
          );
        } catch (e) {
          return dob;
        }
      default:
        const value = customer[fieldName as keyof Customer];
        
        // Handle array types
        if (Array.isArray(value)) {
          if (value.length === 0) return 'N/A';
          
          // Handle Address array
          if (value[0] && 'street' in value[0]) {
            return (
              <div className="space-y-1">
                {(value as Address[]).map((addr, idx) => (
                  <div key={`${addr.street}-${idx}`} className="text-sm text-gray-900">
                    <div>{addr.street}</div>
                    <div>{addr.city}, {addr.state} {addr.zipCode}</div>
                    <div className="text-xs text-gray-500">{addr.type}</div>
                  </div>
                ))}
              </div>
            );
          }
          
          // Handle Phone array
          if (value[0] && 'number' in value[0]) {
            return (
              <div className="space-y-1">
                {(value as Phone[]).map((phone, idx) => (
                  <div key={`${phone.number}-${idx}`} className="text-sm">
                    <a 
                      href={`tel:${phone.number.replace(/\D/g, '')}`} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {phone.number}
                    </a>
                    {phone.isPrimary && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Primary
                      </span>
                    )}
                    <div className="text-xs text-gray-500">{phone.type}</div>
                  </div>
                ))}
              </div>
            );
          }
          
          // Handle Email array
          if (value[0] && 'address' in value[0]) {
            return (
              <div className="space-y-1">
                {(value as Email[]).map((email, idx) => (
                  <div key={`${email.address}-${idx}`} className="text-sm">
                    <a 
                      href={`mailto:${email.address}`} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {email.address}
                    </a>
                    {email.isPrimary && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Primary
                      </span>
                    )}
                    <div className="text-xs text-gray-500">{email.type}</div>
                  </div>
                ))}
              </div>
            );
          }
          
          return value.join(', ');
        }
        
        // Handle non-array values
        return <span className="text-sm text-gray-900">
          {value !== undefined && value !== null ? value.toString() : 'N/A'}
        </span>;
    }
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const sortedFields = [...fields].sort((a, b) => a.renderOrder - b.renderOrder);

  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or add a new customer.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {sortedFields.map((field) => (
                <th
                  key={field.name}
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {customers.map((customer) => (
              <tr 
                key={customer.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {sortedFields.map((field) => (
                  <td 
                    key={`${customer.id}-${field.name}`} 
                    className="whitespace-nowrap px-4 py-4"
                  >
                    {getCustomerFieldValue(customer, field.name)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResults;
