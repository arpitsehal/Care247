import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// Path to your db.json file
const dbPath = path.join(process.cwd(), 'db.json');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const dateOfBirth = searchParams.get('dateOfBirth');

  try {
    // Read the db.json file
    const fileContents = await fs.readFile(dbPath, 'utf8');
    const data = JSON.parse(fileContents);
    let customers = data.customers || [];

    // Apply filters
    if (firstName) {
      customers = customers.filter((customer: any) => 
        customer.firstName.toLowerCase().includes(firstName.toLowerCase())
      );
    }
    
    if (lastName) {
      customers = customers.filter((customer: any) => 
        customer.lastName.toLowerCase().includes(lastName.toLowerCase())
      );
    }
    
    if (dateOfBirth) {
      customers = customers.filter((customer: any) => 
        customer.dateOfBirth === dateOfBirth
      );
    }

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error reading or processing db.json:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
