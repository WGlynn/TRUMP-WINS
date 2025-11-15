import { NextRequest, NextResponse } from 'next/server';
import { db_operations, WinInput } from '@/lib/db';

// GET /api/wins - Get all wins or search with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get('search') || undefined;
    const areas = searchParams.getAll('area');
    const sizes = searchParams.getAll('size');
    const persons = searchParams.getAll('person');

    const wins = db_operations.searchWins(
      searchTerm,
      areas.length > 0 ? areas : undefined,
      sizes.length > 0 ? sizes : undefined,
      persons.length > 0 ? persons : undefined
    );

    return NextResponse.json(wins);
  } catch (error) {
    console.error('Error fetching wins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wins' },
      { status: 500 }
    );
  }
}

// POST /api/wins - Create a new win
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'area', 'size', 'date', 'person'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const winInput: WinInput = {
      title: body.title,
      description: body.description,
      area: body.area,
      size: body.size,
      date: body.date,
      person: body.person,
      sourceLink: body.sourceLink || null,
    };

    const newWin = db_operations.createWin(winInput);
    return NextResponse.json(newWin, { status: 201 });
  } catch (error) {
    console.error('Error creating win:', error);
    return NextResponse.json(
      { error: 'Failed to create win' },
      { status: 500 }
    );
  }
}
