import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { SeatingTable } from '@/models/SeatingTable';
import { Guest } from '@/models/Guest';
import { Wedding } from '@/models/Wedding';
import { getCurrentUser } from '@/lib/auth';

const MOCK_TABLES = [
  {
    _id: 't1',
    tableName: 'Table 1 - VIP Royal',
    capacity: 8,
    guestIds: ['g1', 'g4'],
    position: { x: 120, y: 150 },
  },
  {
    _id: 't2',
    tableName: 'Table 2 - Family & Relatives',
    capacity: 10,
    guestIds: ['g3'],
    position: { x: 400, y: 150 },
  },
  {
    _id: 't3',
    tableName: 'Table 3 - Groom Friends',
    capacity: 8,
    guestIds: [],
    position: { x: 120, y: 380 },
  },
  {
    _id: 't4',
    tableName: 'Table 4 - Bride Friends',
    capacity: 8,
    guestIds: [],
    position: { x: 400, y: 380 },
  },
];

export async function GET() {
  try {
    const user = await getCurrentUser();

    try {
      await connectToDatabase();
      if (user) {
        const wedding = await Wedding.findOne({ userId: user.userId });
        if (wedding) {
          const tables = await SeatingTable.find({ weddingId: wedding._id }).populate('guestIds', 'name rsvpStatus phone');
          return NextResponse.json({ success: true, tables });
        }
      }
    } catch {
      console.warn('DB error, returning mock seating layout');
    }

    return NextResponse.json({ success: true, tables: MOCK_TABLES });
  } catch (error) {
    console.error('Fetch Seating Error:', error);
    return NextResponse.json({ error: 'Failed to fetch seating tables' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { tableName, capacity } = await req.json();
    const user = await getCurrentUser();

    try {
      await connectToDatabase();
      if (user) {
        const wedding = await Wedding.findOne({ userId: user.userId });
        if (wedding) {
          const newTable = await SeatingTable.create({
            weddingId: wedding._id,
            tableName: tableName || 'New Table',
            capacity: Number(capacity) || 8,
            guestIds: [],
            position: { x: 200, y: 200 },
          });
          return NextResponse.json({ success: true, table: newTable });
        }
      }
    } catch {
      console.warn('DB error on create table');
    }

    const mockTable = {
      _id: `t_${Date.now()}`,
      tableName: tableName || 'New Table',
      capacity: Number(capacity) || 8,
      guestIds: [],
      position: { x: 250, y: 250 },
    };

    return NextResponse.json({ success: true, table: mockTable });
  } catch (error) {
    console.error('Create Table Error:', error);
    return NextResponse.json({ error: 'Failed to create table' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { guestId, tableId } = await req.json();

    try {
      await connectToDatabase();
      if (guestId) {
        if (tableId) {
          // Remove guest from any previous table
          await SeatingTable.updateMany({ guestIds: guestId }, { $pull: { guestIds: guestId } });
          // Add to new table
          await SeatingTable.findByIdAndUpdate(tableId, { $addToSet: { guestIds: guestId } });
          await Guest.findByIdAndUpdate(guestId, { tableId });
        } else {
          // Unassign table
          await SeatingTable.updateMany({ guestIds: guestId }, { $pull: { guestIds: guestId } });
          await Guest.findByIdAndUpdate(guestId, { $unset: { tableId: 1 } });
        }
      }
    } catch {
      console.warn('DB seating assignment update simulated');
    }

    return NextResponse.json({ success: true, message: 'Seating updated' });
  } catch (error) {
    console.error('Update Seating Error:', error);
    return NextResponse.json({ error: 'Failed to update seating' }, { status: 500 });
  }
}
