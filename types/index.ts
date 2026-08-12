export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface IWedding {
  _id?: string;
  id?: string;
  userId: string;
  slug: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  venue: string;
  venueAddress?: string;
  coverImage?: string;
  templateId: 'classic' | 'modern' | 'royal' | 'boho';
  themeColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  story?: string;
  publishStatus: boolean;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
  };
  schedule?: Array<{
    title: string;
    time: string;
    description: string;
  }>;
  createdAt?: string;
}

export interface IGuest {
  _id?: string;
  id?: string;
  weddingId: string;
  name: string;
  phone: string;
  email?: string;
  rsvpStatus: 'pending' | 'attending' | 'declined';
  dietaryRestrictions?: string;
  plusOnes: number;
  tableId?: string;
  tableName?: string;
  inviteSent: boolean;
  rsvpNote?: string;
  createdAt?: string;
}

export interface ISeatingTable {
  _id?: string;
  id?: string;
  weddingId: string;
  tableName: string;
  capacity: number;
  guestIds: string[];
  position?: { x: number; y: number };
  createdAt?: string;
}

export interface ISubscription {
  _id?: string;
  id?: string;
  userId: string;
  plan: 'free' | 'pro_lk' | 'pro_global';
  status: 'active' | 'pending' | 'canceled';
  payherePaymentId?: string;
  amount: number;
  currency: 'LKR' | 'USD';
  expiresAt?: string;
  createdAt?: string;
}
