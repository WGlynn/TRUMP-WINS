import { NextRequest, NextResponse } from 'next/server';
import { db_operations } from '@/lib/db';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/wins/[id] - Get a specific win
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const winId = parseInt(id, 10);

    if (isNaN(winId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const win = db_operations.getWinById(winId);

    if (!win) {
      return NextResponse.json({ error: 'Win not found' }, { status: 404 });
    }

    return NextResponse.json(win);
  } catch (error) {
    console.error('Error fetching win:', error);
    return NextResponse.json(
      { error: 'Failed to fetch win' },
      { status: 500 }
    );
  }
}

// PUT /api/wins/[id] - Update a win
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const winId = parseInt(id, 10);

    if (isNaN(winId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();

    const updatedWin = db_operations.updateWin(winId, body);

    if (!updatedWin) {
      return NextResponse.json({ error: 'Win not found' }, { status: 404 });
    }

    return NextResponse.json(updatedWin);
  } catch (error) {
    console.error('Error updating win:', error);
    return NextResponse.json(
      { error: 'Failed to update win' },
      { status: 500 }
    );
  }
}

// DELETE /api/wins/[id] - Delete a win
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const winId = parseInt(id, 10);

    if (isNaN(winId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const success = db_operations.deleteWin(winId);

    if (!success) {
      return NextResponse.json({ error: 'Win not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Win deleted successfully' });
  } catch (error) {
    console.error('Error deleting win:', error);
    return NextResponse.json(
      { error: 'Failed to delete win' },
      { status: 500 }
    );
  }
}
