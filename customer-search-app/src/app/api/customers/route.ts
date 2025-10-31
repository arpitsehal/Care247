import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const dateOfBirth = searchParams.get('dateOfBirth');

  // Build query parameters for JSON Server
  const queryParams = new URLSearchParams();
  
  if (firstName) queryParams.append('firstName_like', firstName);
  if (lastName) queryParams.append('lastName_like', lastName);
  if (dateOfBirth) queryParams.append('dateOfBirth', dateOfBirth);

  try {
    const response = await fetch(`http://localhost:3001/customers?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    
    const customers = await response.json();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
