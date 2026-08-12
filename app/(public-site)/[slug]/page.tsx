import RoyalTemplate from '@/components/public-site/RoyalTemplate';
import { connectToDatabase } from '@/lib/db';
import { Wedding } from '@/models/Wedding';
import { getCurrentUser } from '@/lib/auth';
import { getPublishedSession } from '@/lib/sessionStore';

async function getWedding(slug: string) {
  let baseWedding: any = {
    slug,
    groomName: 'Kasun',
    brideName: 'Dilhani',
    weddingDate: '2026-11-28T09:30:00.000Z',
    venue: 'Shangri-La Hotel, Colombo',
    venueAddress: '1 Galle Face, Colombo 02, Sri Lanka',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    templateId: 'royal' as const,
    publishStatus: true,
    story: 'From our university days to forever, we are excited to embark on this journey together with our family and friends.',
    bankDetails: {
      accountName: 'Kasun & Dilhani Wedding Account',
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

  // 1. Check MongoDB
  try {
    await connectToDatabase();
    const foundDB = await Wedding.findOne({ slug }).lean();
    if (foundDB) {
      baseWedding = { ...baseWedding, ...JSON.parse(JSON.stringify(foundDB)) };
    }
  } catch (err) {
    console.warn('DB lookup skipped on public wedding page:', err);
  }

  // 2. Check sessionStore memory published session
  const memoryPublished = getPublishedSession(slug);
  if (memoryPublished) {
    baseWedding = { ...baseWedding, ...memoryPublished };
  }

  // 3. Check current logged-in user's published session
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      const userPublished = getPublishedSession(currentUser.userId);
      if (userPublished) {
        baseWedding = { ...baseWedding, ...userPublished };
      }
    }
  } catch {}

  return baseWedding;
}

export default async function PublicWeddingPage({ params }: { params: { slug: string } }) {
  const wedding = await getWedding(params.slug);
  return <RoyalTemplate wedding={wedding} />;
}
