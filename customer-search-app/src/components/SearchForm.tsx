import React from 'react';
import { FieldConfig } from '@/types';

interface SearchFormProps {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, any>) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ fields, onSubmit, isLoading }) => {
  const [formValues, setFormValues] = React.useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const sortedFields = [...fields].sort((a, b) => a.renderOrder - b.renderOrder);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap -mx-2">
        {sortedFields.map((field) => (
          <div key={field.name} className={`px-2 mb-4 ${field.width || 'w-full'}`}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formValues[field.name] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formValues[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
