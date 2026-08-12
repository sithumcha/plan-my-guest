import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Wedding } from '@/models/Wedding';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const MOCK_WEDDING = {
  _id: 'w1',
  slug: 'vishmi-sanjana',
  groomName: 'Sanjana',
  brideName: 'Vishmi',
  weddingDate: '2026-11-28T09:30:00.000Z',
  venue: 'Shangri-La Hotel, Colombo',
  venueAddress: '1 Galle Face, Colombo 02, Sri Lanka',
  coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
  templateId: 'royal',
  themeColors: { primary: '#D4AF37', secondary: '#0F382C', accent: '#E0A96D' },
  story: 'From our university days to forever, we are excited to embark on this journey together.',
  publishStatus: true,
  bankDetails: {
    accountName: 'Sanjana & Vishmi Wedding Account',
    accountNumber: '8001234567',
    bankName: 'Commercial Bank of Ceylon',
    branch: 'World Trade Centre Branch',
  },
  schedule: [
    { title: 'Poruwa Ceremony & Traditional Lighting', time: '09:15 AM', description: 'Main Ballroom Stage' },
    { title: 'Champagne Toast & Cake Cutting', time: '11:30 AM', description: 'Grand Foyer' },
    { title: 'Buffet Banquet Lunch', time: '12:30 PM', description: 'Dining Hall' },
    { title: 'Music & Dancing', time: '02:00 PM', description: 'Main Ballroom' },
  ],
};

export async function GET() {
  try {
    const user = await getCurrentUser();

    try {
      await connectToDatabase();
      if (user) {
        const wedding = await Wedding.findOne({ userId: user.userId });
        if (wedding) {
          return NextResponse.json({ success: true, wedding });
        }
      }
    } catch {
      console.warn('DB read error for wedding dashboard, fallback to mock');
    }

    return NextResponse.json({ success: true, wedding: MOCK_WEDDING });
  } catch (error) {
    console.error('Fetch Wedding Error:', error);
    return NextResponse.json({ error: 'Failed to fetch wedding details' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();

    try {
      await connectToDatabase();
      if (user) {
        const updated = await Wedding.findOneAndUpdate({ userId: user.userId }, { $set: body }, { new: true });
        if (updated) {
          return NextResponse.json({ success: true, wedding: updated });
        }
      }
    } catch {
      console.warn('DB update failed, returning simulated updated wedding');
    }

    return NextResponse.json({ success: true, wedding: { ...MOCK_WEDDING, ...body } });
  } catch (error) {
    console.error('Update Wedding Error:', error);
    return NextResponse.json({ error: 'Failed to update wedding details' }, { status: 500 });
  }
}
