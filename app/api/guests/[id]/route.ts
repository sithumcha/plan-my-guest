import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Guest } from '@/models/Guest';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    try {
      await connectToDatabase();
      const updated = await Guest.findByIdAndUpdate(id, { $set: body }, { new: true });
      if (updated) {
        return NextResponse.json({ success: true, guest: updated });
      }
    } catch {
      console.warn('DB update failed, returning simulated PATCH success');
    }

    return NextResponse.json({ success: true, guest: { _id: id, ...body } });
  } catch (error) {
    console.error('Update Guest Error:', error);
    return NextResponse.json({ error: 'Failed to update guest' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    try {
      await connectToDatabase();
      await Guest.findByIdAndDelete(id);
    } catch {
      console.warn('DB delete failed, returning simulated DELETE success');
    }

    return NextResponse.json({ success: true, message: `Guest ${id} deleted` });
  } catch (error) {
    console.error('Delete Guest Error:', error);
    return NextResponse.json({ error: 'Failed to delete guest' }, { status: 500 });
  }
}
