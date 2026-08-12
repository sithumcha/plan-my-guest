import mongoose, { Schema, Document } from 'mongoose';

export interface IWeddingDocument extends Document {
  userId: mongoose.Types.ObjectId;
  slug: string;
  groomName: string;
  brideName: string;
  weddingDate: Date;
  venue: string;
  venueAddress?: string;
  coverImage?: string;
  templateId: 'classic' | 'modern' | 'royal' | 'boho';
  themeColors: {
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
  createdAt: Date;
  updatedAt: Date;
}

const WeddingSchema = new Schema<IWeddingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true, unique: true, index: true },
    groomName: { type: String, required: true },
    brideName: { type: String, required: true },
    weddingDate: { type: Date, required: true },
    venue: { type: String, required: true },
    venueAddress: { type: String, default: '' },
    coverImage: { type: String, default: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200' },
    templateId: { type: String, enum: ['classic', 'modern', 'royal', 'boho'], default: 'royal' },
    themeColors: {
      primary: { type: String, default: '#D4AF37' },
      secondary: { type: String, default: '#0F382C' },
      accent: { type: String, default: '#E0A96D' },
    },
    story: { type: String, default: 'We are thrilled to share our special day with our dearest family and friends!' },
    publishStatus: { type: Boolean, default: true },
    bankDetails: {
      accountName: { type: String, default: '' },
      accountNumber: { type: String, default: '' },
      bankName: { type: String, default: '' },
      branch: { type: String, default: '' },
    },
    schedule: [
      {
        title: { type: String },
        time: { type: String },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Wedding = mongoose.models.Wedding || mongoose.model<IWeddingDocument>('Wedding', WeddingSchema);
