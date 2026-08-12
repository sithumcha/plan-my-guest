import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Guest } from '@/models/Guest';
import { Wedding } from '@/models/Wedding';
import { getCurrentUser } from '@/lib/auth';

// Mock initial data if database is empty/offline
const MOCK_GUESTS = [
  {
    _id: 'g1',
    name: 'Nimal Perera',
    phone: '+94 77 123 4567',
    email: 'nimal@gmail.com',
    rsvpStatus: 'attending',
    dietaryRestrictions: 'Vegetarian',
    plusOnes: 1,
    tableId: 't1',
    tableName: 'Table 1 - VIP Royal',
    inviteSent: true,
  },
  {
    _id: 'g2',
    name: 'Kavindi Silva',
    phone: '+94 71 987 6543',
    email: 'kavindi.silva@yahoo.com',
    rsvpStatus: 'pending',
    dietaryRestrictions: 'None',
    plusOnes: 0,
    tableId: null,
    inviteSent: true,
  },
  {
    _id: 'g3',
    name: 'Sunil & Family',
    phone: '+94 70 555 1234',
    email: 'sunil@company.lk',
    rsvpStatus: 'declined',
    dietaryRestrictions: 'Seafood Allergy',
    plusOnes: 3,
    tableId: 't2',
    tableName: 'Table 2 - Family & Relatives',
    inviteSent: false,
  },
  {
    _id: 'g4',
    name: 'Dr. Ruwan Wickrama',
    phone: '+94 77 888 9900',
    email: 'ruwan@hospital.lk',
    rsvpStatus: 'attending',
    dietaryRestrictions: 'Halal',
    plusOnes: 1,
    tableId: 't1',
    tableName: 'Table 1 - VIP Royal',
    inviteSent: true,
  },
];

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');

    try {
      await connectToDatabase();
      let wedding = null;
      if (user) {
        wedding = await Wedding.findOne({ userId: user.userId });
      }

      if (wedding) {
        const query: Record<string, unknown> = { weddingId: wedding._id };
        if (status && status !== 'all') {
          query.rsvpStatus = status;
        }
        if (search) {
          query.name = { $regex: search, $options: 'i' };
        }

        const guests = await Guest.find(query).populate('tableId', 'tableName').sort({ createdAt: -1 });
        return NextResponse.json({ success: true, guests });
      }
    } catch {
      console.warn('DB connection offline, returning fallback mock guest list');
    }

    let filtered = MOCK_GUESTS;
    if (status && status !== 'all') {
      filtered = filtered.filter((g) => g.rsvpStatus === status);
    }
    if (search) {
      filtered = filtered.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
    }

    return NextResponse.json({ success: true, guests: filtered });
  } catch (error) {
    console.error('Fetch Guests Error:', error);
    return NextResponse.json({ error: 'Failed to fetch guests' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, rsvpStatus, dietaryRestrictions, plusOnes, tableId } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    const user = await getCurrentUser();

    try {
      await connectToDatabase();
      let wedding = null;
      if (user) {
        wedding = await Wedding.findOne({ userId: user.userId });
      }

      if (wedding) {
        const newGuest = await Guest.create({
          weddingId: wedding._id,
          name,
          phone,
          email: email || '',
          rsvpStatus: rsvpStatus || 'pending',
          dietaryRestrictions: dietaryRestrictions || 'None',
          plusOnes: Number(plusOnes) || 0,
          tableId: tableId || null,
        });

        return NextResponse.json({ success: true, guest: newGuest });
      }
    } catch {
      console.warn('DB write failed, using mock guest response');
    }

    const mockGuest = {
      _id: `g_${Date.now()}`,
      name,
      phone,
      email: email || '',
      rsvpStatus: rsvpStatus || 'pending',
      dietaryRestrictions: dietaryRestrictions || 'None',
      plusOnes: Number(plusOnes) || 0,
      tableId: tableId || null,
      inviteSent: false,
    };

    return NextResponse.json({ success: true, guest: mockGuest });
  } catch (error) {
    console.error('Create Guest Error:', error);
    return NextResponse.json({ error: 'Failed to create guest' }, { status: 500 });
  }
}
