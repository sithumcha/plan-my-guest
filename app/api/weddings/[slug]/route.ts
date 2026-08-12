import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Wedding } from '@/models/Wedding';

const MOCK_PUBLIC_SLUGS: Record<string, unknown> = {
  'vishmi-sanjana': {
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
      accountName: 'Sanjana & Vishmi Wedding Fund',
      accountNumber: '8001234567',
      bankName: 'Commercial Bank of Ceylon',
      branch: 'World Trade Centre',
    },
    schedule: [
      { title: 'Poruwa Ceremony & Traditional Lighting', time: '09:15 AM', description: 'Main Ballroom Stage' },
      { title: 'Champagne Toast & Cake Cutting', time: '11:30 AM', description: 'Grand Foyer' },
      { title: 'Buffet Banquet Lunch', time: '12:30 PM', description: 'Dining Hall' },
      { title: 'Music & Dancing', time: '02:00 PM', description: 'Main Ballroom' },
    ],
  },
};

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    try {
      await connectToDatabase();
      const wedding = await Wedding.findOne({ slug, publishStatus: true });
      if (wedding) {
        return NextResponse.json({ success: true, wedding });
      }
    } catch {
      console.warn(`DB read error for public slug ${slug}, checking fallback`);
    }

    if (MOCK_PUBLIC_SLUGS[slug]) {
      return NextResponse.json({ success: true, wedding: MOCK_PUBLIC_SLUGS[slug] });
    }

    // Default mock response so any demo slug renders nicely
    const baseMock = MOCK_PUBLIC_SLUGS['vishmi-sanjana'] as Record<string, unknown>;
    return NextResponse.json({
      success: true,
      wedding: {
        ...baseMock,
        slug,
        groomName: slug.split('-')[1] ? slug.split('-')[1].toUpperCase() : 'Groom',
        brideName: slug.split('-')[0] ? slug.split('-')[0].toUpperCase() : 'Bride',
      },
    });
  } catch (error) {
    console.error('Fetch Public Wedding Error:', error);
    return NextResponse.json({ error: 'Failed to fetch invitation site' }, { status: 500 });
  }
}
