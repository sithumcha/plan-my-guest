import { NextResponse } from 'next/server';
import { getCurrentUser, signToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { Wedding } from '@/models/Wedding';
import { savePublishedSession } from '@/lib/sessionStore';

export async function GET() {
  try {
    const payload = await getCurrentUser();

    if (!payload) {
      return NextResponse.json({ user: null, wedding: null });
    }

    let user: any = null;
    let wedding: any = null;

    try {
      await connectToDatabase();
      user = await User.findById(payload.userId).select('-passwordHash').lean();
      if (user) {
        wedding = await Wedding.findOne({ userId: user._id }).lean();
      }
    } catch (dbErr) {
      console.warn('DB lookup error in /api/auth/me, using token payload fallback:', dbErr);
    }

    // Fallback for demo account or DB offline
    if (!user) {
      const isDemo = payload.email === 'demo@planmyguest.lk';
      const isDev = payload.email.endsWith('@plansite.lk') || payload.userId === 'demo_user_id';
      user = {
        _id: payload.userId,
        name: payload.name || (payload.role === 'admin' ? 'Admin User' : isDemo ? 'Demo Couple' : payload.email.split('@')[0]),
        email: payload.email,
        role: payload.role,
        phone: '+94 77 123 4567',
      };
      if (isDemo || isDev || !wedding) {
        wedding = {
          groomName: 'Kasun',
          brideName: 'Dilhani',
          weddingDate: new Date('2024-10-24'),
          slug: 'kasun-dilhani',
          venue: 'Shangri-La Colombo',
          story: 'Join us for a beautiful celebration of love surrounded by nature.',
        };
      }
    }

    return NextResponse.json({
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        profilePhoto: user.profilePhoto || '',
      },
      wedding: wedding
        ? {
            groomName: wedding.groomName,
            brideName: wedding.brideName,
            weddingDate: wedding.weddingDate,
            slug: wedding.slug,
            venue: wedding.venue,
            story: wedding.story || '',
            coverImage: wedding.coverImage || '',
          }
        : null,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json({ user: null, wedding: null }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const payload = await getCurrentUser();
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      email,
      phone,
      profilePhoto,
      groomName,
      brideName,
      weddingDate,
      venue,
      story,
      coverImage,
      blocks,
      activePalette,
      headingFont,
      bodyFont,
      scheduleItems,
      bankAccount,
      bgMusic,
      showCountdown,
      language,
      enable3DAnimation,
    } = body;

    let updatedUser: any = null;
    let updatedWedding: any = null;

    try {
      await connectToDatabase();
      const userUpdate: any = {};
      if (name !== undefined) userUpdate.name = name;
      if (email !== undefined) userUpdate.email = email.toLowerCase();
      if (phone !== undefined) userUpdate.phone = phone;
      if (profilePhoto !== undefined) userUpdate.profilePhoto = profilePhoto;

      updatedUser = await User.findByIdAndUpdate(payload.userId, { $set: userUpdate }, { new: true })
        .select('-passwordHash')
        .lean();

      const weddingUpdate: any = {};
      if (groomName !== undefined) weddingUpdate.groomName = groomName;
      if (brideName !== undefined) weddingUpdate.brideName = brideName;
      if (weddingDate !== undefined) weddingUpdate.weddingDate = new Date(weddingDate);
      if (venue !== undefined) weddingUpdate.venue = venue;
      if (story !== undefined) weddingUpdate.story = story;
      if (coverImage !== undefined) weddingUpdate.coverImage = coverImage;

      if (Object.keys(weddingUpdate).length > 0) {
        updatedWedding = await Wedding.findOneAndUpdate(
          { userId: payload.userId },
          { $set: weddingUpdate },
          { new: true }
        ).lean();
      } else {
        updatedWedding = await Wedding.findOne({ userId: payload.userId }).lean();
      }
    } catch (dbErr) {
      console.warn('DB update warning in /api/auth/me PUT:', dbErr);
    }

    // Memory fallback if DB offline
    if (!updatedUser) {
      updatedUser = {
        _id: payload.userId,
        name: name || payload.name || 'User',
        email: email || payload.email,
        role: payload.role,
        phone: phone || '',
        profilePhoto: profilePhoto || '',
      };
    }

    if (!updatedWedding) {
      updatedWedding = {
        groomName: groomName || 'Kasun',
        brideName: brideName || 'Dilhani',
        weddingDate: weddingDate ? new Date(weddingDate) : new Date('2024-10-24'),
        slug: 'kasun-dilhani',
        venue: venue || 'Shangri-La Colombo',
        story: story || '',
      };
    }

    const targetSlug = updatedWedding.slug || 'kasun-dilhani';
    savePublishedSession(targetSlug, {
      userId: payload.userId,
      slug: targetSlug,
      groomName: updatedWedding.groomName,
      brideName: updatedWedding.brideName,
      weddingDate: updatedWedding.weddingDate,
      venue: updatedWedding.venue,
      story: updatedWedding.story,
      coverImage: updatedWedding.coverImage,
      blocks,
      activePalette,
      headingFont,
      bodyFont,
      scheduleItems,
      bankAccount,
      bgMusic,
      showCountdown,
      language,
      enable3DAnimation,
    });

    // Re-sign token if name or email changed
    const newToken = signToken({
      userId: payload.userId,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: updatedUser._id || updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone || '',
        profilePhoto: updatedUser.profilePhoto || '',
      },
      wedding: {
        groomName: updatedWedding.groomName,
        brideName: updatedWedding.brideName,
        weddingDate: updatedWedding.weddingDate,
        slug: updatedWedding.slug,
        venue: updatedWedding.venue,
        story: updatedWedding.story || '',
      },
    });

    res.cookies.set('pmg_token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
