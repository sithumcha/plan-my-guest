import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'plan-my-guest-super-secret-key-2026';

export interface TokenPayload {
  userId: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('pmg_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
