# Customer Search Application

A modern, responsive customer search application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to search for customers based on various criteria and view their details in a clean, organized interface.

## Features

- Search customers by first name, last name, or date of birth
- Responsive design that works on desktop and mobile devices
- Clean, modern UI with loading and error states
- Real-time search results
- Sample customer data included

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- JSON Server (for mock API)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd customer-search-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   # In the first terminal, start the Next.js app
   npm run dev
   # or
   yarn dev

   # In a second terminal, start the JSON server
   npm run server
   ```

4. **Open the application**
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Configuration Approach

The application uses a configuration-driven approach for search fields, making it easy to add or modify search criteria without changing the core components.

### Key Configuration Files:

- `src/config/search.config.ts`: Defines the search fields, result fields, and their properties
- `db.json`: Contains mock customer data in JSON format
- `src/app/api/customers/route.ts`: API route for handling customer search requests

## Adding a New Search Field

To add a new search field to the application:

1. **Update the search configuration**
   Open `src/config/search.config.ts` and add a new field to the `searchFields` array:

   ```typescript
   {
     name: 'fieldName',
     label: 'Field Label',
     type: 'text', // or 'date', 'number', etc.
     placeholder: 'Enter value',
     renderOrder: 4, // Adjust the order as needed
     width: 'w-full md:w-1/3', // Responsive width
   }
   ```

2. **Update the API route**
   Modify `src/app/api/customers/route.ts` to handle the new search parameter:

   ```typescript
   const fieldValue = searchParams.get('fieldName');
   if (fieldValue) queryParams.append('fieldName_like', fieldValue);
   ```

3. **Update the results display (if needed)**
   If you want the new field to appear in the search results, add it to the `resultsFields` array in `search.config.ts`.

## Trade-offs and Decisions

1. **JSON Server for Mock Data**
   - **Pros**: Easy to set up and use for development
   - **Cons**: Not suitable for production; would need to be replaced with a real API

2. **Configuration-Driven UI**
   - **Pros**: Makes the application more maintainable and easier to extend
   - **Cons**: Slight overhead for simple use cases

3. **Client-Side Filtering**
   - **Pros**: Faster response times for small datasets
   - **Cons**: Not scalable for large datasets; would need server-side pagination and filtering in production

4. **UI Framework**
   - **Pros**: Tailwind CSS provides rapid UI development
   - **Cons**: Larger CSS bundle size compared to utility-first approaches

## Time Spent

- Initial setup and configuration: 30 minutes
- Search functionality: 45 minutes
- UI/UX improvements: 1 hour
- Testing and bug fixes: 30 minutes
- Documentation: 15 minutes

**Total: ~3 hours**

## Future Improvements

- Add pagination for large result sets
- Implement server-side sorting
- Add user authentication
- Include more advanced search filters
- Add customer creation/editing functionality
- Implement unit and integration tests

## License

This project is open source and available under the [MIT License](LICENSE).
