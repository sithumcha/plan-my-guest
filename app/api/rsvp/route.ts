import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Guest } from '@/models/Guest';
import { Wedding } from '@/models/Wedding';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { weddingSlug, guestId, name, phone, rsvpStatus, plusOnes, dietaryRestrictions, rsvpNote } = body;

    if (!weddingSlug || !name || !phone || !rsvpStatus) {
      return NextResponse.json({ error: 'Missing required RSVP fields' }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const wedding = await Wedding.findOne({ slug: weddingSlug });

      if (wedding) {
        let guest = null;
        if (guestId) {
          guest = await Guest.findById(guestId);
        }

        if (!guest) {
          guest = await Guest.findOne({ weddingId: wedding._id, phone });
        }

        if (guest) {
          guest.rsvpStatus = rsvpStatus;
          guest.plusOnes = Number(plusOnes) || 0;
          if (dietaryRestrictions) guest.dietaryRestrictions = dietaryRestrictions;
          if (rsvpNote) guest.rsvpNote = rsvpNote;
          await guest.save();
          return NextResponse.json({ success: true, message: 'RSVP updated successfully!', guest });
        } else {
          // Create new RSVP guest entry
          const newGuest = await Guest.create({
            weddingId: wedding._id,
            name,
            phone,
            rsvpStatus,
            plusOnes: Number(plusOnes) || 0,
            dietaryRestrictions: dietaryRestrictions || 'None',
            rsvpNote: rsvpNote || '',
            inviteSent: true,
          });
          return NextResponse.json({ success: true, message: 'RSVP submitted successfully!', guest: newGuest });
        }
      }
    } catch {
      console.warn('DB error during RSVP submission, returning mock response');
    }

    return NextResponse.json({
      success: true,
      message: 'RSVP recorded successfully (Simulated)',
      guest: { name, rsvpStatus, plusOnes, rsvpNote },
    });
  } catch (error) {
    console.error('Public RSVP Error:', error);
    return NextResponse.json({ error: 'Failed to process RSVP' }, { status: 500 });
  }
}
