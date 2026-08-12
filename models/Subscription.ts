import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  plan: 'free' | 'pro_lk' | 'pro_global';
  status: 'active' | 'pending' | 'canceled';
  payherePaymentId?: string;
  amount: number;
  currency: 'LKR' | 'USD';
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    plan: { type: String, enum: ['free', 'pro_lk', 'pro_global'], default: 'free' },
    status: { type: String, enum: ['active', 'pending', 'canceled'], default: 'active' },
    payherePaymentId: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    currency: { type: String, enum: ['LKR', 'USD'], default: 'LKR' },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export const Subscription =
  mongoose.models.Subscription || mongoose.model<ISubscriptionDocument>('Subscription', SubscriptionSchema);
