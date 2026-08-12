import { NextResponse } from 'next/server';
import { sendWhatsAppInvite } from '@/lib/whatsapp';
import { connectToDatabase } from '@/lib/db';
import { Guest } from '@/models/Guest';

export async function POST(req: Request) {
  try {
    const { guestId, phone, guestName, coupleNames, invitationUrl, bulk } = await req.json();

    if (bulk && Array.isArray(bulk)) {
      const results = [];
      for (const item of bulk) {
        const res = await sendWhatsAppInvite({
          to: item.phone,
          guestName: item.guestName,
          coupleNames: coupleNames || 'Kasun & Dilhani',
          invitationUrl: item.invitationUrl || 'https://plansite.lk/vishmi-sanjana',
        });
        results.push(res);
      }
      return NextResponse.json({ success: true, count: results.length, results });
    }

    if (!phone || !guestName) {
      return NextResponse.json({ error: 'Missing phone or guestName' }, { status: 400 });
    }

    const result = await sendWhatsAppInvite({
      to: phone,
      guestName,
      coupleNames: coupleNames || 'Kasun & Dilhani',
      invitationUrl: invitationUrl || 'https://plansite.lk/vishmi-sanjana',
    });

    if (guestId) {
      try {
        await connectToDatabase();
        await Guest.findByIdAndUpdate(guestId, { inviteSent: true });
      } catch {
        console.warn('DB update inviteSent flag skipped');
      }
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('WhatsApp dispatch error:', error);
    return NextResponse.json({ error: 'Failed to send WhatsApp message' }, { status: 500 });
  }
}
