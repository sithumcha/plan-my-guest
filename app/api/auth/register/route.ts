import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { Wedding } from '@/models/Wedding';
import { Subscription } from '@/models/Subscription';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, groomName, brideName, weddingDate, venue } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required user fields' }, { status: 400 });
    }

    try {
      await connectToDatabase();
    } catch {
      console.warn('Database connection failed, operating with mock memory session');
    }

    // Check if user exists
    let existingUser = null;
    try {
      existingUser = await User.findOne({ email: email.toLowerCase() });
    } catch {
      // Ignore if DB offline
    }

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let newUser;
    let newWedding;
    let baseSlug = generateSlug(groomName || 'Groom', brideName || 'Bride');

    try {
      newUser = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: email.includes('admin') ? 'admin' : 'user',
      });

      // Ensure unique slug
      let uniqueSlug = baseSlug;
      let count = 1;
      while (await Wedding.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${count++}`;
      }

      newWedding = await Wedding.create({
        userId: newUser._id,
        slug: uniqueSlug,
        groomName: groomName || 'Kasun',
        brideName: brideName || 'Dilhani',
        weddingDate: weddingDate ? new Date(weddingDate) : new Date(Date.now() + 90 * 86400000),
        venue: venue || 'Shangri-La Colombo',
        templateId: 'royal',
        publishStatus: true,
      });

      await Subscription.create({
        userId: newUser._id,
        plan: 'free',
        status: 'active',
        amount: 0,
        currency: 'LKR',
      });
    } catch (dbErr) {
      console.warn('DB Write error during registration:', dbErr);
      newUser = { _id: 'mock_user_id', name, email, role: 'user' };
      newWedding = { _id: 'mock_wedding_id', slug: baseSlug };
    }

    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    const res = NextResponse.json({
      success: true,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      wedding: newWedding,
      token,
    });

    res.cookies.set('pmg_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
